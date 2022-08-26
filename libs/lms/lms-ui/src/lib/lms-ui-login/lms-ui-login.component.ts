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
  PlayButtonModule,
  PlayCardModule,
  PlayIconModule,
  PlayInputTextModule,
  PlayRippleModule,
  PlayHeadingModule,
} from '@playground/play-ui';

@Component({
  selector: 'lms-ui-login',
  templateUrl: './lms-ui-login.component.html',
  styleUrls: ['./lms-ui-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayCardModule,
    PlayInputTextModule,
    PlayButtonModule,
    PlayIconModule,
    PlayRippleModule,
    PlayHeadingModule,
  ],
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
