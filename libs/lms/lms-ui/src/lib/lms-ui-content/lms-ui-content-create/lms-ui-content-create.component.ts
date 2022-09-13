import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayStepperComponent } from '@playground/play-ui';

@Component({
  selector: 'lms-ui-content-create',
  templateUrl: './lms-ui-content-create.component.html',
  styleUrls: ['./lms-ui-content-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, CdkStepperModule, PlayStepperComponent],
})
export class LmsUiContentCreateComponent {
  @HostBinding('class.lms-ui-content-create') lmsUiContentCreateClass =
    'lms-ui-content-create';
}
