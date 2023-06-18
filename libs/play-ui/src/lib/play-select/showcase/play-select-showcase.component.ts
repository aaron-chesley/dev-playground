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
  itemOptions = Array(100000)
    .fill(0)
    .map((_, i) => `Item # ${i}`);
  favoriteItems = new FormControl(
    { value: this.itemOptions[0], disabled: false }
    // { validators: [Validators.required] }
  );

  fruitOptions = ['Apple', 'Banana', 'Orange', 'Grape'];
  favoriteFruit = this.fruitOptions[0];

  animalOptions = ['Dog'];
  favoriteAnimal = this.animalOptions[0];

  onFruitPlaySelectChange(event: string) {
    this.favoriteFruit = event;
  }

  onAnimalPlaySelectChange(event: string) {
    this.favoriteAnimal = event;
  }
}
