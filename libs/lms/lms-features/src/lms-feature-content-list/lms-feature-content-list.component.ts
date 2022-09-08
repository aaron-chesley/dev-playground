import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmsUiContentListComponent } from '@playground/lms-ui';
import { LmsContentItem } from '@playground/lms/lms-util';
import { map, Observable } from 'rxjs';
import { LmsFeatureContentListStore } from './lms-feature-content-list.store';

@Component({
  selector: 'lms-feature-content-list',
  template: `<lms-ui-content-list
    [contentItems]="contentItems$ | async"
  ></lms-ui-content-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiContentListComponent],
})
export class LmsFeatureContentListComponent {
  constructor(private contentStore: LmsFeatureContentListStore) {}
  contentItems$: Observable<LmsContentItem[]> =
    this.contentStore.contentList$.pipe(map((x) => x.results));
}
