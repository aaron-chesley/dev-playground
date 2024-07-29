import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayInputTextComponent } from '@playground/play-ui';

@Component({
  selector: 'cardly-login',
  templateUrl: './cardly-login.component.html',
  styleUrls: ['./cardly-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, PlayInputTextComponent],
})
export class CardlyLoginComponent {
  displayName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);

  @Output() login = new EventEmitter<string>();

  onSubmit(): void {
    if (this.displayName.valid) {
      this.login.emit(this.displayName.value);
    }
  }
}
