import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export enum CardlySound {
  CARD_FAN_1 = 'card-fan-1.ogg',
  CARD_FAN_2 = 'card-fan-2.ogg',
  CARD_PLACE_1 = 'card-place-1.ogg',
  CARD_PLACE_2 = 'card-place-2.ogg',
  CARD_PLACE_3 = 'card-place-3.ogg',
  CARD_PLACE_4 = 'card-place-4.ogg',
  CARD_SHOVE_1 = 'card-shove-1.ogg',
  CARD_SHOVE_2 = 'card-shove-2.ogg',
  CARD_SHOVE_3 = 'card-shove-3.ogg',
  CARD_SHOVE_4 = 'card-shove-4.ogg',
  CARD_SHUFFLE = 'card-shuffle.ogg',
  CARD_SLIDE_1 = 'card-slide-1.ogg',
  CARD_SLIDE_2 = 'card-slide-2.ogg',
  CARD_SLIDE_3 = 'card-slide-3.ogg',
  CARD_SLIDE_4 = 'card-slide-4.ogg',
  CARD_SLIDE_5 = 'card-slide-5.ogg',
  CARD_SLIDE_6 = 'card-slide-6.ogg',
  CARD_SLIDE_7 = 'card-slide-7.ogg',
  CARD_SLIDE_8 = 'card-slide-8.ogg',
  CARDS_PACK_OPEN_1 = 'cards-pack-open-1.ogg',
  CARDS_PACK_OPEN_2 = 'cards-pack-open-2.ogg',
  CARDS_PACK_TAKE_OUT_1 = 'cards-pack-take-out-1.ogg',
  CARDS_PACK_TAKE_OUT_2 = 'cards-pack-take-out-2.ogg',
  CHIP_LAY_1 = 'chip-lay-1.ogg',
  CHIP_LAY_2 = 'chip-lay-2.ogg',
  CHIP_LAY_3 = 'chip-lay-3.ogg',
  CHIPS_COLLIDE_1 = 'chips-collide-1.ogg',
  CHIPS_COLLIDE_2 = 'chips-collide-2.ogg',
  CHIPS_COLLIDE_3 = 'chips-collide-3.ogg',
  CHIPS_COLLIDE_4 = 'chips-collide-4.ogg',
  CHIPS_HANDLE_1 = 'chips-handle-1.ogg',
  CHIPS_HANDLE_2 = 'chips-handle-2.ogg',
  CHIPS_HANDLE_3 = 'chips-handle-3.ogg',
  CHIPS_HANDLE_4 = 'chips-handle-4.ogg',
  CHIPS_HANDLE_5 = 'chips-handle-5.ogg',
  CHIPS_HANDLE_6 = 'chips-handle-6.ogg',
  CHIPS_STACK_1 = 'chips-stack-1.ogg',
  CHIPS_STACK_2 = 'chips-stack-2.ogg',
  CHIPS_STACK_3 = 'chips-stack-3.ogg',
  CHIPS_STACK_4 = 'chips-stack-4.ogg',
  CHIPS_STACK_5 = 'chips-stack-5.ogg',
  CHIPS_STACK_6 = 'chips-stack-6.ogg',
  DICE_GRAB_1 = 'dice-grab-1.ogg',
  DICE_GRAB_2 = 'dice-grab-2.ogg',
  DICE_SHAKE_1 = 'dice-shake-1.ogg',
  DICE_SHAKE_2 = 'dice-shake-2.ogg',
  DICE_SHAKE_3 = 'dice-shake-3.ogg',
  DICE_THROW_1 = 'dice-throw-1.ogg',
  DICE_THROW_2 = 'dice-throw-2.ogg',
  DICE_THROW_3 = 'dice-throw-3.ogg',
  DICE_THROW_4 = 'dice-throw-4.ogg',
}

export const CARDLY_SOUNDS_PATH = new InjectionToken<string>('CARDLY_SOUNDS_BASE_PATH');

@Injectable({
  providedIn: 'root',
})
export class CardlyAudioService {
  private readonly defaultPath = '/assets/audio';

  constructor(@Optional() @Inject(CARDLY_SOUNDS_PATH) private readonly basePath: string) {
    this.basePath = basePath || this.defaultPath;
  }

  playSound(sound: CardlySound) {
    const audio = new Audio(`${this.basePath}/${sound}`);
    audio.play();
  }
}
