import type { Plant } from '@/assets/plant';
import { StateManager } from '@/state/states';
import type { UI } from '@/ui/ui';

const state = {
  plants: [] as Plant[],
  stateManager: new StateManager(),
  ui: null as UI | null,
};

export default state;
