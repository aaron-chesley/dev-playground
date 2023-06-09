import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaySelectComponent } from '../play-select.component';

@Component({
  selector: 'play-select-showcase',
  templateUrl: './play-select-showcase.component.html',
  styleUrls: ['./play-select-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlaySelectComponent],
})
export class PlaySelectShowcaseComponent {
  animalOptions = [
    'Dog',
    'Cat',
    'Bird',
    'Mouse',
    'Lion',
    'Tiger',
    'Bear',
    'Wolf',
    'Fox',
    'Rabbit',
    'Snake',
    'Elephant',
    'Giraffe',
  ];
  favoriteAnimal = new FormControl(
    { value: this.animalOptions[0], disabled: false },
    { validators: [Validators.required] }
  );

  fruitOptions = ['Apple', 'Banana', 'Orange', 'Grape'];
  favoriteFruit = this.fruitOptions[0];

  onPlaySelectChange(event: string) {
    this.favoriteFruit = event;
  }
}
