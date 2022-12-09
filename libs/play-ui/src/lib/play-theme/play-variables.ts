export const PLAY_CSS_VARIABLES = [
  '--play-primary-color-lightest',
  '--play-primary-color-lighter',
  '--play-primary-color',
  '--play-primary-color-darker',
  '--play-primary-color-darkest',
  '--play-accent-color-lighter',
  '-play-accent-color-lightest',
  '--play-accent-color',
  '--play-primary-color-darker',
  '--play-primary-color-darkest',
  '--play-success-color',
  '--play-error-color',
  '--play-warning-color',
  '--play-text-color',
] as const;

export type PlayCssVariable = typeof PLAY_CSS_VARIABLES[number];
