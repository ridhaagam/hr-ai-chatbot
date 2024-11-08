import { motion } from 'framer-motion';

import { MessageIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <MessageIcon size={32} />
        </p>
        <p>
          Selamat datang di HR-GenAI, asisten hukum ketenagakerjaan Indonesia
          yang cerdas. Dirancang khusus untuk membantu Anda memahami dan
          menerapkan peraturan ketenagakerjaan Indonesia dengan lebih baik.
        </p>
        <p className="text-muted-foreground">
          Fitur utama kami mencakup:
          <br />
          • Analisis kontrak kerja (PKWT/PKWTT)
          <br />
          • Perhitungan pesangon sesuai UU
          <br />
          • Informasi hak dan kewajiban pekerja
          <br />• Panduan kebijakan HR
        </p>
        <p>
          Dapatkan jawaban cepat dan akurat tentang peraturan ketenagakerjaan
          Indonesia, didukung oleh referensi UU yang relevan dan perhitungan
          yang presisi.
        </p>
      </div>
    </motion.div>
  );
};
