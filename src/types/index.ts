export const PlantStatus = {
  growing: 'growing',
  ripe: 'ripe',
};

export type PlantStatus = (typeof PlantStatus)[keyof typeof PlantStatus];

export interface PlantConfig {
  readonly name: string;
  readonly textures: Record<PlantStatus, string>;
  readonly scale: number;
}

export interface Vector2D {
  readonly x: number;
  readonly z: number;
}
