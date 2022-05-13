import { NgModule, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-card',
  template: `
    <div class="play-card">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayCardComponent {}

@NgModule({
  imports: [],
  exports: [PlayCardComponent],
  declarations: [PlayCardComponent],
  providers: [],
})
export class PlayCardModule {}
