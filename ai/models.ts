// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono::AR7H9cQt',
    label: 'HR Gen-AI',
    apiIdentifier: 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono::AR7H9cQt',
    description: 'Specific model for HR',
  },
  // {
  //   id: 'gpt-4o',
  //   label: 'GPT 4o',
  //   apiIdentifier: 'gpt-4o',
  //   description: 'For complex, multi-step tasks',
  // },
  // {
  //   id: 'gpt-4o-blocks',
  //   label: 'GPT 4o with Blocks',
  //   apiIdentifier: 'gpt-4o',
  //   description: 'Collaborate with writing',
  // },
] as const;

export const DEFAULT_MODEL_NAME: string = 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono::AR7H9cQt';
