import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LmsUiTag, LmsUiTagListComponent } from '@playground/lms-ui';
import { PlayModalModule, PlayModalService } from '@playground/play-ui';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { LmsFeatureTagListStore } from './lms-feature-tag-list.store';

@Component({
  selector: 'lms-feature-tag-list',
  template: `<lms-ui-tag-list
    [tags]="tags$ | async"
    (deleteTagClick)="deleteTag($event)"
  ></lms-ui-tag-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LmsUiTagListComponent, PlayModalModule],
})
export class LmsFeatureTagListComponent implements OnInit {
  tags$: Observable<LmsUiTag[]>;

  ngOnInit() {
    this.tags$ = this.lmsTagStore.tags$;
  }

  deleteTag(tag: LmsUiTag) {
    this.playModalService
      .confirm({
        confirmBody: 'Are you sure you want to delete this tag?',
      })
      .pipe(
        filter((close) => !!close),
        switchMap(() => this.lmsTagStore.deleteTag(tag)),
        catchError((err) => {
          this.playModalService.alert({
            alertBody: 'There was a problem deleting this tag',
          });
          return throwError(err);
        })
      )
      .subscribe();
  }

  constructor(
    private lmsTagStore: LmsFeatureTagListStore,
    private playModalService: PlayModalService
  ) {}
}
