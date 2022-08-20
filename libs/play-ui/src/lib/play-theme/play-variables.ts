export const PLAY_CSS_VARIABLES = [
  '--play-primary-color',
  '--play-primary-color-lighter',
  '--play-primary-color-lightest',
  '--play-accent-color',
  '--play-accent-color-lighter',
  '-play-accent-color-lightest',
  '--play-success-color',
  '--play-error-color',
  '--play-warning-color',
  '--play-text-color',
] as const;

export type PlayCssVariable = typeof PLAY_CSS_VARIABLES[number];
