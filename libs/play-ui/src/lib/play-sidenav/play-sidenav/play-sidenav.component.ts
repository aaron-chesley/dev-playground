import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-sidenav',
  templateUrl: './play-sidenav.component.html',
  styleUrls: ['./play-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlaySidenavComponent {
  @HostBinding('class.play-sidenav') showClass = true;
}
