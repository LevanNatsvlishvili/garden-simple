import type { Plant } from '@/assets/plant';
import { StateManager } from '@/state/states';
import { UI } from '@/ui/ui';

class GameStore {
  readonly plants: Plant[] = [];
  readonly stateManager: StateManager = new StateManager();
  readonly ui: UI = new UI();
}

export default new GameStore();
