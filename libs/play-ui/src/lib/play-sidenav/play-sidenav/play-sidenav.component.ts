import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [CommonModule],
})
export class PlaySidenavComponent {
  @HostBinding('class.play-sidenav') showClass = true;
}
