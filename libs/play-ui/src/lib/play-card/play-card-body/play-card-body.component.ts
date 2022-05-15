import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCardService } from '../play-card.service';

@Component({
  selector: 'play-card-body',
  templateUrl: './play-card-body.component.html',
  styleUrls: ['./play-card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardBodyComponent {
  @HostBinding('class.play-card-body') className = 'play-card-body';
  @HostBinding('class.play-card-body-with-header') get withHeader() {
    return this.playCardService.hasHeader;
  }
  @HostBinding('class.play-card-body-with-footer') get withFooter() {
    return this.playCardService.hasFooter;
  }
  @HostBinding('style.height') heightInPixels = '';
  @Input() set height(value: number) {
    this.heightInPixels = `${value}px`;
  }

  constructor(private playCardService: PlayCardService) {}
}
