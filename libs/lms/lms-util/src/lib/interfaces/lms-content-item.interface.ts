import { LmsContentType } from '../types/lms-content-type.type';
import { LmsSlide } from './lms-slide.interface';
import { LmsVideo } from './lms-video.interface';

export interface LmsContentItem {
  content_type: LmsContentType;
  video: LmsVideo | null;
  slide: LmsSlide | null;
}
