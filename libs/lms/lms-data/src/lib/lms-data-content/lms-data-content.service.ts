import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '@playground/shared/shared-data';
import { Paginated } from '@playground/shared/shared-util';
import {
  LmsContentItem,
  LmsContentItemCreate,
  getLmsContentItem,
} from '@playground/lms-util';

@Injectable({
  providedIn: 'root',
})
export class LmsDataContentService {
  constructor(private apiService: ApiService) {}

  createContent(body: LmsContentItemCreate) {
    return this.apiService.post('content/', body);
  }

  updateContent(content: LmsContentItem) {
    return this.apiService.put(`content/${content.id}/`, content);
  }

  deleteContent(contentId: string) {
    return this.apiService.delete('content/' + contentId + '/');
  }

  getContent(contentId: string) {
    return this.apiService
      .get<LmsContentItem>(`content/${contentId}/?expand=video,assessment,tags`)
      .pipe(
        map((item) => {
          return getLmsContentItem(item, item.content_type);
        })
      );
  }

  searchContent(
    searchPath: string = '',
    pageNumber = '1'
  ): Observable<Paginated<LmsContentItem>> {
    return this.apiService.get<Paginated<LmsContentItem>>(
      'content/?expand=video&page_size=8&page=' + pageNumber + '&' + searchPath
    );
  }
}
