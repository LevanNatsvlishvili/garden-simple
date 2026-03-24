import state from '@/store/state';

export interface GameState {
  enter(): void;
  exit(): void;
  update?(delta: number): void;
}

export class StateManager {
  private currentState: GameState | null = null;

  transition(next: GameState) {
    this.currentState?.exit();
    this.currentState = next;
    this.currentState.enter();
  }

  update(delta: number) {
    this.currentState?.update?.(delta);
  }
}

export class GrowingState implements GameState {
  enter() {
    state.ui!.createButton('water', '💧 Water Plants', () => {
      state.stateManager.transition(new RipeState());
    });
    state.ui!.showButton('water');
  }

  exit() {
    state.ui!.hideButton('water');
  }
}

export class RipeState implements GameState {
  private elapsed = 0;
  private transitioned = false;

  enter() {
    for (const plant of state.plants) {
      plant.water();
    }
  }

  update(delta: number) {
    this.elapsed += delta;

    if (this.elapsed > 1.5 && !this.transitioned) {
      this.transitioned = true;
      state.stateManager.transition(new DownloadableState());
    }
  }

  exit() {}
}

export class DownloadableState implements GameState {
  enter() {
    state.ui!.createButton('download', 'Download now!', () => {
      console.log('download clicked — redirect to store');
    });
    state.ui!.showButton('download');
  }

  exit() {
    state.ui!.hideButton('download');
  }
}
