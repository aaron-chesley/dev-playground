export const PLAY_BUTTON_APPEARANCES = [
  'play-btn',
  'play-flat',
  'play-outline',
  'play-fab',
  'play-fab-mini',
  'play-icon-btn',
] as const;

export type PlayButtonAppearance = typeof PLAY_BUTTON_APPEARANCES[number];
