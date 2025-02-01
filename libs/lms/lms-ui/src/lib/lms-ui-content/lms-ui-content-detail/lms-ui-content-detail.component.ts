import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {
  PlayButtonComponent,
  PlayCheckboxComponent,
  PlayFormFieldComponent,
  PlayFormFieldLabelComponent,
  PlayGroupComponent,
  PlayIconComponent,
  PlayIconRegistryService,
  PlayInputTextComponent,
  removeCircleOutline,
} from '@playground/play-ui';
import { LmsContentItem, LmsContentItemForm } from '@playground/lms-util';
import { YouTubeIdPipe } from '../youtube-id.pipe';
import { getLmsAssessmentForm } from 'libs/lms/lms-util/src/lib/interfaces/lms-assessment.interface';

@Component({
    selector: 'lms-ui-content-detail',
    templateUrl: './lms-ui-content-detail.component.html',
    styleUrls: ['./lms-ui-content-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        YouTubePlayerModule,
        YouTubeIdPipe,
        PlayFormFieldComponent,
        PlayFormFieldLabelComponent,
        PlayInputTextComponent,
        PlayButtonComponent,
        PlayGroupComponent,
        PlayCheckboxComponent,
        PlayIconComponent,
    ]
})
export class LmsUiContentDetailComponent implements OnInit, OnChanges {
  @HostBinding('class.lms-ui-content-detail') lmsUiContentDetailClass =
    'lms-ui-content-detail';

  @Input() content: LmsContentItem;
  @Input() loading: boolean;
  @Output() saveContent = new EventEmitter<LmsContentItem>();

  videoContentForm: FormGroup<LmsContentItemForm>;

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onSaveContent() {
    this.saveContent.emit(this.videoContentForm.getRawValue());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content && changes.content.currentValue) {
      this.videoContentForm = this.fb.group({
        id: this.fb.control(this.content.id ?? ''),
        content_type: this.fb.control(this.content.content_type ?? 'VIDEO'),
        video: this.fb.group({
          id: this.fb.control(this.content.video.id ?? ''),
          name: this.fb.control(this.content.video.name ?? ''),
          description: this.fb.control(this.content.video.description ?? ''),
          duration: this.fb.control(this.content.video.duration ?? '00:00'),
          video_url: this.fb.control(this.content.video.video_url ?? ''),
          thumbnail_url: this.fb.control(
            this.content.video.thumbnail_url ?? ''
          ),
        }),
        slide: this.fb.group({
          id: this.fb.control(''),
          name: this.fb.control(''),
          description: this.fb.control(''),
        }),
        assessment: getLmsAssessmentForm(this.content.assessment),
        tags: this.fb.array(
          this.content.tags.map((tag) => this.fb.control(tag))
        ),
      });
    }
  }

  questions(): FormArray {
    return this.videoContentForm
      .get('assessment')
      .get('questions') as FormArray;
  }

  answers(questionIndex: number): FormArray {
    return this.questions().at(questionIndex).get('answers') as FormArray;
  }

  addQuestion() {
    this.questions().push(
      this.fb.group({
        question: this.fb.control(''),
        answers: this.fb.array([]),
      })
    );
    let i = 0;
    while (i < 4) {
      this.addAnswer(this.questions().length - 1);
      i++;
    }
  }

  removeQuestion(questionIndex: number) {
    this.questions().removeAt(questionIndex);
  }

  addAnswer(questionIndex: number) {
    this.answers(questionIndex).push(
      this.fb.group({
        answer: this.fb.control(''),
        is_correct: this.fb.control(false),
      })
    );
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.answers(questionIndex).removeAt(answerIndex);
  }

  constructor(
    private fb: FormBuilder,
    private iconService: PlayIconRegistryService
  ) {
    this.iconService.registerIcons([removeCircleOutline]);
  }
}
