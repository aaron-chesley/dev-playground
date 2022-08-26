import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LmsTagService } from '@playground/lms-data';
import { LmsUiTag, LmsUiTagListComponent } from '@playground/lms-ui';
import { PlayModalModule } from '@playground/play-ui';
import { Observable } from 'rxjs';

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
    this.fetchTags();
  }

  fetchTags(): void {
    this.tags$ = this.tagService.searchTags();
  }

  async deleteTag(tag: LmsUiTag) {
    // const shouldDelete = await this.playModalService
    //   .confirm({ confirmBody: 'Are you sure you want to delete this tag?' })
    //   .toPromise();
    // if (shouldDelete) {
    //   this.tagService.deleteTag(tag.id).subscribe(() => this.fetchTags());
    // }
  }
  constructor(
    private tagService: LmsTagService
  ) // private playModalService: PlayModalService
  {}
}
