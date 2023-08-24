import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youTubeId',
  standalone: true,
})
export class YouTubeIdPipe implements PipeTransform {
  transform(value: string): string {
    const videoId = value.substring(value.lastIndexOf('/') + 1);
    if (!videoId || !value.includes('youtu')) {
      throw new Error('Invalid YouTube URL');
    }
    return videoId;
  }
}
