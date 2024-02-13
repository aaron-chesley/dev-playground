export const PLAY_SNACKBAR_POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center-center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

export type PlaySnackbarPosition = (typeof PLAY_SNACKBAR_POSITIONS)[number];
