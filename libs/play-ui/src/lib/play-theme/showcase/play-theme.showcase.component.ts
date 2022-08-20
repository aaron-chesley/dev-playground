import { DOCUMENT } from '@angular/common';
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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'play-theme-showcase',
  templateUrl: './play-theme-showcase.component.html',
  styleUrls: ['./play-theme-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PlayButtonModule,
    PlayRippleModule,
    PlayButtonShowcaseModule,
  ],
})
export class PlayThemeShowcaseComponent implements OnInit {
  primaryColor = new FormControl(
    tinycolor(
      getComputedStyle(this.document.documentElement).getPropertyValue(
        '--play-primary-color'
      )
    ).toHexString()
  );

  accentColor = new FormControl(
    tinycolor(
      getComputedStyle(this.document.documentElement).getPropertyValue(
        '--play-accent-color'
      )
    ).toHexString()
  );

  ngOnInit() {
    this.primaryColor.valueChanges
      .pipe(debounceTime(250))
      .subscribe((color) => this.primaryColorChange(color));

    this.accentColor.valueChanges
      .pipe(debounceTime(250))
      .subscribe((color) => this.accentColorChange(color));
  }

  private primaryColorChange(primaryColor: string | null) {
    if (!primaryColor) return;
    const lighter = tinycolor(primaryColor).brighten(25).toHexString();
    const lightest = tinycolor(primaryColor).brighten(75).toHexString();

    this.loadStyle('--play-primary-color', primaryColor);
    this.loadStyle('--play-primary-color-lighter', lighter);
    this.loadStyle('--play-primary-color-lightest', lightest);
  }

  private accentColorChange(accentColor: string | null) {
    if (!accentColor) return;
    const lighter = tinycolor(accentColor).brighten(25).toHexString();
    const lightest = tinycolor(accentColor).brighten(75).toHexString();

    this.loadStyle('--play-accent-color', accentColor);
    this.loadStyle('--play-accent-color-lighter', lighter);
    this.loadStyle('--play-accent-color-lightest', lightest);
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

  constructor(@Inject(DOCUMENT) private document: Document) {}
}
