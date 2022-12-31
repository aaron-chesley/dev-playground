import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaySelectOptionComponent } from '../play-select-option.component';
import { PlaySelectComponent } from '../play-select.component';

@Component({
  selector: 'play-select-showcase',
  templateUrl: './play-select-showcase.component.html',
  styleUrls: ['./play-select-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlaySelectComponent,
    PlaySelectOptionComponent,
  ],
})
export class PlaySelectShowcaseComponent {
  favoriteAnimal = new FormControl('', Validators.required);
  favoriteFruit = 'Banana';

  onPlaySelectChange(event: string) {
    this.favoriteFruit = event;
  }
}
