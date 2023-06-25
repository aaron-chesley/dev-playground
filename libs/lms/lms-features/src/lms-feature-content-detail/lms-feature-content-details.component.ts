import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmsUiContentDetailComponent } from '@playground/lms-ui';

@Component({
  selector: 'lms-feature-content-detail',
  template: `<lms-ui-content-detail></lms-ui-content-detail>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiContentDetailComponent],
})
export class LmsFeatureContentDetailComponent {}
