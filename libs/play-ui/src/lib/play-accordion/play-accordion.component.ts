import {
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'play-accordion',
  templateUrl: './play-accordion.component.html',
  styleUrls: ['./play-accordion.component.scss'],
  standalone: true,
})
export class PlayAccordionComponent {
  @ContentChildren('accordionItem') items: QueryList<ElementRef>;
}
