export const PLAY_SNACKBAR_SEVERITIES = ['info', 'success', 'warning', 'error'] as const;

export type PlaySnackbarSeverity = (typeof PLAY_SNACKBAR_SEVERITIES)[number];
