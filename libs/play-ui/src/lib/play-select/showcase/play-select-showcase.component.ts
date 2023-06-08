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
  animalOptions = ['Dog', 'Cat', 'Bird', 'Mouse'];
  favoriteAnimal = new FormControl(this.animalOptions[0], Validators.required);

  fruitOptions = ['Apple', 'Banana', 'Orange', 'Grape'];
  favoriteFruit = this.fruitOptions[0];

  onPlaySelectChange(event: string) {
    this.favoriteFruit = event;
  }
}
