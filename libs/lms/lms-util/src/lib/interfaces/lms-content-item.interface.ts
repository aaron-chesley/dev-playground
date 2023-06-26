import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LmsContentType } from '../types/lms-content-type.type';
import { LmsSlide, LmsSlideCreate, LmsSlideForm } from './lms-slide.interface';
import { LmsVideo, LmsVideoCreate, LmsVideoForm } from './lms-video.interface';
import { LmsAssessment, LmsAssessmentForm } from './lms-assessment.interface';

export interface LmsContentItem {
  id: string;
  content_type: LmsContentType;
  video: LmsVideo | null;
  slide: LmsSlide | null;
  assessment?: LmsAssessment;
}

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
