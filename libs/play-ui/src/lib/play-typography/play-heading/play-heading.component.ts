import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-heading',
  templateUrl: './play-heading.component.html',
  styleUrls: ['./play-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayHeadingComponent {
  @HostBinding('class') playHeading = 'play-heading';
  @Input() size: number | undefined;
}
