import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'play-stepper',
  templateUrl: './play-stepper.component.html',
  styleUrls: ['./play-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, CdkStepperModule],
  providers: [{ provide: CdkStepper, useExisting: PlayStepperComponent }],
})
export class PlayStepperComponent extends CdkStepper {
  @HostBinding('class.play-stepper') playStepperClass = 'play-stepper';

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
