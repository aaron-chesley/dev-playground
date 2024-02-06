import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayInputTextComponent } from '@playground/play-ui';

@Component({
  selector: 'cardly-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, PlayInputTextComponent],
})
export class LoginModalComponent {
  displayName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);

  onSubmit(): void {
    if (this.displayName.valid) {
      this.dialogRef.close({ displayName: this.displayName.value });
    }
  }

  constructor(private dialogRef: DialogRef<{ displayName: string }, LoginModalComponent>) {}
}
