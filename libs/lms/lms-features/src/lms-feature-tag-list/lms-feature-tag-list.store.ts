import { Injectable } from '@angular/core';
import { LmsTagService } from '@playground/lms-data';
import { LmsUiTag } from '@playground/lms-ui';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LmsFeatureTagListStore {
  private tagsSub = new BehaviorSubject<LmsUiTag[]>([]);
  readonly tags$: Observable<LmsUiTag[]> = this.tagsSub
    .asObservable()
    .pipe(shareReplay());

  fetchTags(): Observable<LmsUiTag[]> {
    return this.tagService
      .searchTags()
      .pipe(tap((tags) => this.tagsSub.next(tags)));
  }

  deleteTag(tag: LmsUiTag) {
    return this.tagService.deleteTag(tag.id).pipe(tap(() => this.fetchTags()));
  }

  constructor(private tagService: LmsTagService) {
    this.fetchTags().subscribe();
  }
}
