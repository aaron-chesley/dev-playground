import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'play-stepper',
  templateUrl: './play-stepper.component.html',
  styleUrls: ['./play-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgTemplateOutlet, CdkStepperModule],
  providers: [{ provide: CdkStepper, useExisting: PlayStepperComponent }],
})
export class PlayStepperComponent extends CdkStepper {
  @HostBinding('class.play-stepper') playStepperClass = 'play-stepper';

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
