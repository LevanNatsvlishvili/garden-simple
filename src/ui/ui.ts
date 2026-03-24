import { Container, Graphics, Text } from 'pixi.js';
import { pixiApp } from './pixiApp';

const { app } = pixiApp;

const btnConfig = {
  width: 240,
  height: 52,
  radius: 14,
  color: 0x4caf50,
  hover: 0x66bb6a,
  textStyle: {
    fill: 0xffffff,
    fontSize: 20,
    fontFamily: 'Segoe UI, Arial, sans-serif',
    fontWeight: 'bold',
  },
};

interface ButtonProps {
  container: Container;
  bg: Graphics;
  label: Text;
}

export class UI {
  private readonly buttons: Map<string, ButtonProps> = new Map();

  createButton(id: string, text: string, onClick: () => void) {
    const container = new Container();
    container.eventMode = 'static';
    container.cursor = 'pointer';
    container.visible = false;

    const bg = new Graphics();
    this.drawBg(bg, btnConfig.color);
    container.addChild(bg);

    const label = new Text({ text, style: { ...btnConfig.textStyle } });
    label.anchor.set(0.5);
    label.position.set(btnConfig.width / 2, btnConfig.height / 2);
    container.addChild(label);

    container.hitArea = {
      contains: (x: number, y: number) =>
        x >= 0 && x <= btnConfig.width && y >= 0 && y <= btnConfig.height,
    };

    container.on('pointerdown', onClick);
    container.on('pointerover', () => this.drawBg(bg, btnConfig.hover));
    container.on('pointerout', () => this.drawBg(bg, btnConfig.color));

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
      const x = (app.screen.width - btnConfig.width) / 2;
      const y = app.screen.height - btnConfig.height - 40;
      btn.container.position.set(x, y);
    }
  }

  private drawBg(bg: Graphics, color: number) {
    bg.clear();
    bg.roundRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);
    bg.fill({ color, alpha: 0.9 });
  }
}
