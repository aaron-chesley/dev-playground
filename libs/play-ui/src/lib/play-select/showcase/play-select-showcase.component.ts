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
  animalOptions = getRandomStringArray(5000);
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

function getRandomStringArray(num: number): string[] {
  const arr: string[] = [];
  while (arr.length < num) {
    const str = Math.random().toString(10).substr(2, 10);
    if (!arr.includes(str)) {
      arr.push(str);
    }
  }
  return arr;
}
