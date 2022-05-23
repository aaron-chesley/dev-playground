import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-modal-custom',
  templateUrl: './play-modal-custom.component.html',
  styleUrls: ['../_play-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalCustomComponent {
  @ViewChild('content', { read: ViewContainerRef })
  viewRef!: ViewContainerRef;
}
