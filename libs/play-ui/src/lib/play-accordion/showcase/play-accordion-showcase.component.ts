import { Component } from '@angular/core';
import { PlayAccordionItemComponent } from '../play-accordion-item.component';
import { PlayAccordionComponent } from '../play-accordion.component';

@Component({
  selector: 'play-accordion-showcase',
  templateUrl: './play-accordion-showcase.component.html',
  styleUrls: ['./play-accordion-showcase.component.scss'],
  standalone: true,
  imports: [PlayAccordionComponent, PlayAccordionItemComponent],
})
export class PlayAccordionShowcaseComponent {}
