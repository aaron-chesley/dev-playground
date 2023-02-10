import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@playground/shared/shared-data';
import { Paginated } from '@playground/shared/shared-util';
import { LmsContentItem, LmsContentItemCreate } from '@playground/lms-util';

@Injectable({
  providedIn: 'root',
})
export class LmsDataContentService {
  constructor(private apiService: ApiService) {}

  createContent(body: LmsContentItemCreate) {
    return this.apiService.post('content/', body);
  }

  updateContent(contentId: string, body: LmsContentItem) {
    return this.apiService.put('content/' + contentId + '/', body);
  }

  deleteContent(contentId: string) {
    return this.apiService.delete('content/' + contentId + '/');
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
