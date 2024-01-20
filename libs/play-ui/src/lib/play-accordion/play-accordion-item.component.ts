import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'play-accordion-item',
  templateUrl: './play-accordion-item.component.html',
  styleUrls: ['./play-accordion-item.component.scss'],
  standalone: true,
  imports: [],
})
export class PlayAccordionItemComponent {
  @Output() accordionToggle = new EventEmitter<void>();
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
