import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@playground/shared/shared-data';
import { Paginated } from '@playground/shared/shared-util';
import { LmsContentItem } from '@playground/lms/lms-util';

@Injectable({
  providedIn: 'root',
})
export class LmsDataContentService {
  constructor(private apiService: ApiService) {}

  public createContent(body: LmsContentItem) {
    return this.apiService.post('content/', body);
  }

  public updateContent(contentId: string, body: LmsContentItem) {
    return this.apiService.put('content/' + contentId + '/', body);
  }

  public deleteContent(contentId: string) {
    return this.apiService.delete('content/' + contentId + '/');
  }

  public searchContent(
    searchPath: string = ''
  ): Observable<Paginated<LmsContentItem>> {
    return this.apiService.get<Paginated<LmsContentItem>>(
      'content/?expand=video&page_size=8&' + searchPath
    );
  }
}
