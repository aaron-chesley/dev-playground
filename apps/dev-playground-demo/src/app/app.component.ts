import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dev-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = new FormControl('', [Validators.required]);
  totalQuantity = new FormControl(0, [Validators.required]);
}
