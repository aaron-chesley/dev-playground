import { FormControl } from '@angular/forms';

export interface LmsVideo {
  id: string;
  name: string;
  description: string;
  duration: string;
  video_url: string;
  thumbnail_url: string;
}

export interface LmsVideoForm {
  id: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  duration: FormControl<string>;
  video_url: FormControl<string>;
  thumbnail_url: FormControl<string>;
}

export type LmsVideoCreate = Omit<LmsVideo, 'id'>;
