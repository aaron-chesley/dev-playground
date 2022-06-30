import { InjectionToken } from '@angular/core';
import { PlayTheme } from '../play-theme.type';
import { PlayButtonAppearance } from './play-button-appearance.type';

export interface PlayButtonDefaultOptions {
  appearance: PlayButtonAppearance;
  theme: PlayTheme;
}

export const getPlayButtonDefaultOptions = (): PlayButtonDefaultOptions => ({
  appearance: 'play-outline',
  theme: 'primary',
});

export const PLAY_BUTTON_DEFAULT_OPTIONS =
  new InjectionToken<PlayButtonDefaultOptions>('PLAY_BUTTON_DEFAULT_OPTIONS', {
    providedIn: 'root',
    factory: getPlayButtonDefaultOptions,
  });
