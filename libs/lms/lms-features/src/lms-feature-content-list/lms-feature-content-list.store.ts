import { Injectable } from '@angular/core';
import { LmsDataContentService } from '@playground/lms-data';
import { LmsContentItem } from '@playground/lms/lms-util';
import { getDefaultPaginated, Paginated } from '@playground/shared/shared-util';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LmsFeatureContentListStore {
  private contentListSub = new BehaviorSubject<Paginated<LmsContentItem>>(
    getDefaultPaginated()
  );
  readonly contentList$: Observable<Paginated<LmsContentItem>> =
    this.contentListSub.asObservable().pipe(shareReplay());

  fetchContentList() {
    this.contentService
      .searchContent()
      .subscribe((contentList) => this.contentListSub.next(contentList));
  }

  deleteContent(tag: LmsContentItem) {
    return this.contentService
      .deleteContent(tag.id)
      .pipe(tap(() => this.fetchContentList()));
  }

  constructor(private contentService: LmsDataContentService) {
    this.fetchContentList();
  }
}
