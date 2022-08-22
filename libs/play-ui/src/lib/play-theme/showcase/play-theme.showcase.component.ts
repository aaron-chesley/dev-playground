import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PlayButtonModule } from '../../play-button/play-button.module';
import tinycolor from 'tinycolor2';
import { PlayRippleModule } from '../../play-ripple/play-ripple';
import { PlayButtonShowcaseModule } from '../../play-button/play-button-showcase/play-button-showcase.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PLAY_CSS_VARIABLES } from '../play-variables';

@Component({
  selector: 'play-theme-showcase',
  templateUrl: './play-theme-showcase.component.html',
  styleUrls: ['./play-theme-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PlayButtonModule,
    PlayRippleModule,
    PlayButtonShowcaseModule,
  ],
})
export class PlayThemeShowcaseComponent implements OnInit {
  colorsForm: FormGroup;

  originalOrder = (): number => 0;

  ngOnInit() {
    const obj = PLAY_CSS_VARIABLES.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value]: new FormControl(
          tinycolor(
            getComputedStyle(this.document.documentElement).getPropertyValue(
              value
            )
          ).toHexString()
        ),
      };
    }, {});

    this.colorsForm = this.fb.group({ ...obj });

    this.colorsForm.valueChanges.pipe(debounceTime(250)).subscribe((val) => {
      Object.keys(val).forEach((key) => {
        this.handleColorChange(key, this.colorsForm.value[key]);
      });
    });
  }

  private handleColorChange(variableName: string, variableValue: string) {
    const color = tinycolor(variableValue).toHslString();
    this.loadStyle(variableName, color);
  }

  private loadStyle(
    cssVariable: string,
    cssValue: string,
    cssSuffix: string = ''
  ) {
    this.document.documentElement.style.setProperty(
      cssVariable,
      cssValue + cssSuffix
    );
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder
  ) {}
}
