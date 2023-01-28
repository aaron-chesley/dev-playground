import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'play-accordion-item',
  templateUrl: './play-accordion-item.component.html',
  styleUrls: ['./play-accordion-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PlayAccordionItemComponent {
  @Output() accordionToggle = new EventEmitter<void>();
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
