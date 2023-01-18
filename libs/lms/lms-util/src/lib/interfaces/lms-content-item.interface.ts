import { LmsContentType } from '../types/lms-content-type.type';
import { LmsSlide, LmsSlideCreate } from './lms-slide.interface';
import { LmsVideo, LmsVideoCreate } from './lms-video.interface';

export interface LmsContentItem {
  id: string;
  content_type: LmsContentType;
  video: LmsVideo | null;
  slide: LmsSlide | null;
}
export interface LmsContentItemCreate {
  content_type: LmsContentType;
  video: LmsVideoCreate | null;
  slide: LmsSlideCreate | null;
}
