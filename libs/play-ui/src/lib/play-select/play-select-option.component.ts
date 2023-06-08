import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCheckboxComponent } from '../play-checkbox/play-checkbox.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { PlayOptionService } from './showcase/play-option.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'play-select-option',
  templateUrl: './play-select-option.component.html',
  styleUrls: ['./play-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgTemplateOutlet, NgIf, PlayCheckboxComponent],
})
export class PlaySelectOptionComponent {
  @Input() value: any;
  multiple = false;
  selection: SelectionModel<unknown>;

  @HostBinding('class') className = 'play-select-option';
  @HostBinding('class.play-select-option-active') get activeClass() {
    return !this.multiple && this.selection.isSelected(this.value);
  }
  @HostListener('click', ['$event']) onClick() {
    this.playOptionService.toggleSelection(this.value);
  }

  constructor(private playOptionService: PlayOptionService) {
    this.selection = this.playOptionService.selection;
    this.multiple = this.playOptionService.allowMultiple;
  }
}
