import * as THREE from 'three';

type ProgressHandler = (loaded: number, total: number) => void;
type CompleteHandler = () => void;

export class LoadingManager {
  readonly three: THREE.LoadingManager;

  private progressHandler: ProgressHandler | undefined;
  private completeHandler: CompleteHandler | undefined;

  constructor() {
    this.three = new THREE.LoadingManager();

    this.three.onProgress = (_url, loaded, total) => {
      this.progressHandler?.(loaded, total);
    };

    this.three.onLoad = () => {
      this.completeHandler?.();
    };

    this.three.onError = (url) => {
      console.error(`Error loading: ${url}`);
    };
  }

  onProgress(cb: ProgressHandler) {
    this.progressHandler = cb;
  }

  onComplete(cb: CompleteHandler) {
    this.completeHandler = cb;
  }
}

export const loadingManager = new LoadingManager();
