import { FormControl, FormGroup } from '@angular/forms';
import { LmsContentType } from '../types/lms-content-type.type';
import {
  LmsSlide,
  LmsSlideCreate,
  LmsSlideForm,
  getLmsSlide,
} from './lms-slide.interface';
import {
  LmsVideo,
  LmsVideoCreate,
  LmsVideoForm,
  getLmsVideo,
} from './lms-video.interface';
import {
  LmsAssessment,
  LmsAssessmentForm,
  getLmsAssessment,
} from './lms-assessment.interface';

export interface LmsContentItem {
  id: string;
  content_type: LmsContentType;
  video: LmsVideo | null;
  slide: LmsSlide | null;
  assessment: LmsAssessment;
}

export const getLmsContentItem = (
  item: Partial<LmsContentItem>,
  contentType: LmsContentType
): LmsContentItem => ({
  id: item.id ?? '',
  content_type: contentType,
  video:
    item.content_type === 'VIDEO'
      ? {
          ...getLmsVideo(),
          ...item.video,
        }
      : null,
  slide:
    item.content_type === 'SLIDE'
      ? {
          ...getLmsSlide(),
          ...item.slide,
        }
      : null,
  assessment: item.assessment ?? getLmsAssessment(),
});

export interface LmsContentItemForm {
  id: FormControl<string>;
  content_type: FormControl<LmsContentType>;
  video: FormGroup<LmsVideoForm | null>;
  slide: FormGroup<LmsSlideForm> | null;
  assessment: FormGroup<LmsAssessmentForm>;
}
export interface LmsContentItemCreate {
  content_type: LmsContentType;
  video: LmsVideoCreate | null;
  slide: LmsSlideCreate | null;
}
