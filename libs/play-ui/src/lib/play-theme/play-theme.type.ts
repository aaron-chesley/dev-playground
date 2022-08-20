export const PLAY_THEMES = ['primary', 'accent', 'warn'] as const;

export type PlayTheme = typeof PLAY_THEMES[number];
