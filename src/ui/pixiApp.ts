import { Application } from 'pixi.js';

export class PixiApp {
  readonly app = new Application();

  async init() {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio,
      autoDensity: true,
    });

    document.getElementById('ui')!.appendChild(this.app.canvas);
  }

  resize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}

export const pixiApp = new PixiApp();
