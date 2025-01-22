// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    // id: 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono::AR7H9cQt',
    // label: 'HR Gen-AI',
    // apiIdentifier: 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono::AR7H9cQt',
    // description: 'Specific model for HR',
    id: 'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono:industrial-relationship:AsUFb2at',
    label: 'HR Gen-AI',
    apiIdentifier:
      'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono:industrial-relationship:AsUFb2at',
    description: 'Specific model for HR',
  },
] as const;

export const DEFAULT_MODEL_NAME: string =
  'ft:gpt-4o-mini-2024-07-18:galih-wasis-wicaksono:industrial-relationship:AsUFb2at';
