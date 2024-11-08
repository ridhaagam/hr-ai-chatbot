import {
  convertToCoreMessages,
  Message,
  StreamData,
  streamText,
  streamObject,
} from 'ai';
import { z } from 'zod';

import { customModel } from '@/ai';
import { models } from '@/ai/models';
import { auth } from '@/app/(auth)/auth';
import {
  deleteChatById,
  getChatById,
  getDocumentById,
  saveChat,
  saveDocument,
  saveMessages,
} from '@/db/queries';
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from '@/lib/utils';

import { generateTitleFromUserMessage } from '../../actions';

export const maxDuration = 60;

type AllowedTools =
  | 'analyzeContract'
  | 'calculateSeverance'
  | 'createDocument'
  | 'updateDocument';

const hrTools: AllowedTools[] = [
  'analyzeContract',
  'calculateSeverance',
  'createDocument',
  'updateDocument',
];

// HR-specific system prompt
const hrSystemPrompt = `Anda adalah asisten hukum yang ahli dalam bidang hukum ketenagakerjaan Indonesia. Tugas Anda adalah:

1. Menganalisis informasi terkait:
   - Kontrak kerja (PKWT/PKWTT)
   - Peraturan ketenagakerjaan
   - Kebijakan perusahaan
   - Topik HR lainnya

2. Fokus analisis mencakup:
   - Identifikasi detail kontrak (jenis, durasi, perpanjangan)
   - Evaluasi kepatuhan dengan UU Ketenagakerjaan Indonesia
   - Batas durasi kontrak
   - Legalitas perpanjangan
   - Hak karyawan

3. Untuk perhitungan pesangon, mengacu pada Pasal 156:
   a. masa kerja kurang dari 1 tahun: 1 bulan upah
   b. masa kerja 1-2 tahun: 2 bulan upah
   c. masa kerja 2-3 tahun: 3 bulan upah
   d. masa kerja 3-4 tahun: 4 bulan upah
   e. masa kerja 4-5 tahun: 5 bulan upah
   f. masa kerja 5-6 tahun: 6 bulan upah
   g. masa kerja 6-7 tahun: 7 bulan upah
   h. masa kerja 7-8 tahun: 8 bulan upah
   i. masa kerja 8+ tahun: 9 bulan upah

PENTING: Jika pertanyaan tidak terkait hukum ketenagakerjaan Indonesia, balas:
"Mohon maaf, pertanyaan Anda di luar cakupan hukum ketenagakerjaan Indonesia. Silakan ajukan pertanyaan terkait:
- Kontrak kerja (PKWT/PKWTT)
- Pesangon dan kompensasi
- Hak dan kewajiban pekerja
- Peraturan ketenagakerjaan
- Kebijakan HR sesuai UU"`;

export async function POST(request: Request) {
  const {
    id,
    messages,
    modelId,
  }: { id: string; messages: Array<Message>; modelId: string } =
    await request.json();

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response('Model not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage) {
    return new Response('No user message found', { status: 400 });
  }

  const chat = await getChatById({ id });

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId: session.user.id, title });
  }

  await saveMessages({
    messages: [
      { ...userMessage, id: generateUUID(), createdAt: new Date(), chatId: id },
    ],
  });

  const streamingData = new StreamData();

  const result = await streamText({
    model: customModel(model.apiIdentifier),
    system: hrSystemPrompt,
    messages: coreMessages,
    maxSteps: 5,
    experimental_activeTools: hrTools,
    tools: {
      analyzeContract: {
        description:
          'Analyze an employment contract for compliance with Indonesian law',
        parameters: z.object({
          contractType: z.enum(['PKWT', 'PKWTT']),
          duration: z.string(),
          terms: z.string(),
        }),
        execute: async ({ contractType, duration, terms }) => {
          const analysis = {
            type: contractType,
            duration,
            compliance: {
              status: 'Pending Review',
              issues: [],
              recommendations: [],
            },
          };

          streamingData.append({
            type: 'analysis',
            content: analysis,
          });

          return analysis;
        },
      },
      calculateSeverance: {
        description: 'Calculate severance pay based on Indonesian labor law',
        parameters: z.object({
          yearsOfService: z.number(),
          monthlySalary: z.number(),
        }),
        execute: async ({ yearsOfService, monthlySalary }) => {
          // Implement Pasal 156 calculations
          let multiplier = Math.min(Math.floor(yearsOfService) + 1, 9);
          const severancePay = monthlySalary * multiplier;

          const calculation = {
            yearsOfService,
            monthlySalary,
            multiplier,
            severancePay,
            basis: 'Pasal 156 UU Ketenagakerjaan',
          };

          streamingData.append({
            type: 'calculation',
            content: calculation,
          });

          return calculation;
        },
      },
      createDocument: {
        description: 'Create an HR document or policy',
        parameters: z.object({
          title: z.string(),
          documentType: z.enum(['policy', 'contract', 'memo']),
        }),
        execute: async ({ title, documentType }) => {
          const id = generateUUID();
          let draftText: string = '';

          streamingData.append({
            type: 'id',
            content: id,
          });

          const { fullStream } = await streamText({
            model: customModel(model.apiIdentifier),
            system:
              'Create an HR document following Indonesian labor law requirements.',
            prompt: `Create a ${documentType} titled: ${title}`,
          });

          for await (const delta of fullStream) {
            if (delta.type === 'text-delta') {
              draftText += delta.textDelta;
              streamingData.append({
                type: 'text-delta',
                content: delta.textDelta,
              });
            }
          }

          if (session.user && session.user.id) {
            await saveDocument({
              id,
              title,
              content: draftText,
              userId: session.user.id,
            });
          }

          return {
            id,
            title,
            type: documentType,
            content: 'Document created successfully.',
          };
        },
      },
      updateDocument: {
        description: 'Update an existing HR document',
        parameters: z.object({
          id: z.string(),
          description: z.string(),
        }),
        execute: async ({ id, description }) => {
          const document = await getDocumentById({ id });

          if (!document) {
            return { error: 'Document not found' };
          }

          let draftText: string = '';

          streamingData.append({
            type: 'clear',
            content: document.title,
          });

          const { fullStream } = await streamText({
            model: customModel(model.apiIdentifier),
            system:
              'Update the HR document following Indonesian labor law requirements.',
            messages: [
              { role: 'user', content: description },
              { role: 'user', content: document.content },
            ],
          });

          for await (const delta of fullStream) {
            if (delta.type === 'text-delta') {
              draftText += delta.textDelta;
              streamingData.append({
                type: 'text-delta',
                content: delta.textDelta,
              });
            }
          }

          if (session.user && session.user.id) {
            await saveDocument({
              id,
              title: document.title,
              content: draftText,
              userId: session.user.id,
            });
          }

          return {
            id,
            title: document.title,
            content: 'Document updated successfully.',
          };
        },
      },
    },
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          const sanitizedMessages = sanitizeResponseMessages(responseMessages);
          await saveMessages({
            messages: sanitizedMessages.map((message) => {
              const messageId = generateUUID();
              if (message.role === 'assistant') {
                streamingData.appendMessageAnnotation({
                  messageIdFromServer: messageId,
                });
              }
              return {
                id: messageId,
                chatId: id,
                role: message.role,
                content: message.content,
                createdAt: new Date(),
              };
            }),
          });
        } catch (error) {
          console.error('Failed to save chat');
        }
      }
      streamingData.close();
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
  });

  return result.toDataStreamResponse({
    data: streamingData,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}
