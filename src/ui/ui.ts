import { Container, Graphics, Text } from 'pixi.js';
import { pixiApp } from './pixiApp';

const { app } = pixiApp;

const BTN_WIDTH = 240;
const BTN_HEIGHT = 52;
const BTN_RADIUS = 14;
const BTN_COLOR = 0x4caf50;
const BTN_HOVER = 0x66bb6a;
const BTN_TEXT_STYLE = {
  fill: 0xffffff,
  fontSize: 20,
  fontFamily: 'Segoe UI, Arial, sans-serif',
  fontWeight: 'bold' as const,
};

interface ButtonProps {
  container: Container;
  bg: Graphics;
  label: Text;
}

export class UI {
  private readonly buttons: Map<string, ButtonProps> = new Map();

  createButton(id: string, text: string, onClick: () => void) {
    // if (this.buttons.has(id)) this.removeButton(id);

    const container = new Container();
    container.eventMode = 'static';
    container.cursor = 'pointer';
    container.visible = false;

    const bg = new Graphics();
    this._drawBg(bg, BTN_COLOR);
    container.addChild(bg);

    const label = new Text({ text, style: BTN_TEXT_STYLE });
    label.anchor.set(0.5);
    label.position.set(BTN_WIDTH / 2, BTN_HEIGHT / 2);
    container.addChild(label);

    container.hitArea = {
      contains: (x: number, y: number) => x >= 0 && x <= BTN_WIDTH && y >= 0 && y <= BTN_HEIGHT,
    };

    container.on('pointerdown', onClick);
    container.on('pointerover', () => this._drawBg(bg, BTN_HOVER));
    container.on('pointerout', () => this._drawBg(bg, BTN_COLOR));

    app.stage.addChild(container);
    this.buttons.set(id, { container, bg, label });
    this.layout();
  }

  showButton(id: string) {
    const btn = this.buttons.get(id);
    if (btn) {
      btn.container.visible = true;
      this.layout();
    }
  }

  hideButton(id: string) {
    const btn = this.buttons.get(id);
    if (btn) btn.container.visible = false;
  }

  layout() {
    for (const btn of this.buttons.values()) {
      if (!btn.container.visible) continue;
      const x = (app.screen.width - BTN_WIDTH) / 2;
      const y = app.screen.height - BTN_HEIGHT - 40;
      btn.container.position.set(x, y);
    }
  }

  _drawBg(bg: Graphics, color: number) {
    bg.clear();
    bg.roundRect(0, 0, BTN_WIDTH, BTN_HEIGHT, BTN_RADIUS);
    bg.fill({ color, alpha: 0.9 });
  }
}
