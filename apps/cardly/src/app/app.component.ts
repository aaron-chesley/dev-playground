import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppUpdateService } from '@playground/shared/shared-features';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private updateService: AppUpdateService) {}
}
