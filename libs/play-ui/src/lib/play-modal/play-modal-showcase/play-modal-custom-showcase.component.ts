import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'play-custom-showcase',
  template: `<span>Play Custom Showcase Works!</span
    ><button (click)="closeDialog()">Close</button>`,
})
export class PlayCustomShowcaseComponent {
  closeDialog() {
    this.matDialogRef.close({ data: { moreData: { title: 'closed' } } });
  }
  constructor(
    private matDialogRef: MatDialogRef<PlayCustomShowcaseComponent>
  ) {}
}
