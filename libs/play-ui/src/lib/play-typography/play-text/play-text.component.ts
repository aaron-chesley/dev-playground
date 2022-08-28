import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p,[playText]',
  templateUrl: './play-text.component.html',
  styleUrls: ['./play-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayTextComponent implements OnInit {
  @HostBinding('class') className = '';
  @Input() size = 4;

  ngOnInit() {
    this.className = `play-${this.size}`;
  }
}
