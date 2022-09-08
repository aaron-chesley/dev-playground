import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@playground/shared/shared-data';

interface LmsDataTag {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LmsTagService {
  constructor(private apiService: ApiService) {}

  public createTag(body: LmsDataTag) {
    return this.apiService.post('tags/', body);
  }

  public updateTag(tagId: string, body: LmsDataTag) {
    return this.apiService.put('tags/' + tagId + '/', body);
  }

  public deleteTag(tagId: string) {
    return this.apiService.delete('tags/' + tagId + '/');
  }

  public searchTags(searchPath: string = ''): Observable<LmsDataTag[]> {
    return this.apiService.get<LmsDataTag[]>('tags/?page_size=0&' + searchPath);
  }
}
