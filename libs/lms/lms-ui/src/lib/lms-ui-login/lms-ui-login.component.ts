import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  PlayButtonComponent,
  PlayCardComponent,
  PlayInputTextComponent,
  PlayTextComponent,
} from '@playground/play-ui';
import { PlayCardBodyComponent } from 'libs/play-ui/src/lib/play-card/play-card-body/play-card-body.component';

@Component({
    selector: 'lms-ui-login',
    templateUrl: './lms-ui-login.component.html',
    styleUrls: ['./lms-ui-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PlayCardComponent,
        PlayCardBodyComponent,
        PlayInputTextComponent,
        PlayButtonComponent,
        PlayTextComponent,
    ]
})
export class LmsUiLoginComponent {
  @Input() loading = false;
  @Output() forgotPasswordClicked = new EventEmitter<void>();
  @Output() loginClicked = new EventEmitter<{
    email: string;
    password: string;
  }>();

  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  showPassword = true;
}
