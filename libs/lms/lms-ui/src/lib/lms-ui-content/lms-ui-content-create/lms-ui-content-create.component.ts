import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LMS_CONTENT_TYPES,
  LmsContentItemCreate,
  LmsContentType,
} from '@playground/lms-util';
import {
  PlayButtonComponent,
  PlayButtonGroupComponent,
  PlayCardBodyComponent,
  PlayCardComponent,
  PlayCardFooterComponent,
  PlayCardHeaderComponent,
  PlayFormFieldComponent,
  PlayFormFieldLabelComponent,
  PlayGroupComponent,
  PlayInputTextComponent,
  PlaySelectComponent,
} from '@playground/play-ui';

interface LmsUiContentCreateForm {
  content_type: FormControl<LmsContentType>;
  slide: FormControl<{
    description: string;
    name: string;
    thumbnail_url: string;
    url: string;
  } | null>;
  video: FormGroup<{
    description: FormControl<string>;
    duration: FormControl<string>;
    name: FormControl<string>;
    thumbnail_url: FormControl<string>;
    video_url: FormControl<string>;
  } | null>;
}

@Component({
  selector: 'lms-ui-content-create',
  templateUrl: './lms-ui-content-create.component.html',
  styleUrls: ['./lms-ui-content-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayCardComponent,
    PlayCardHeaderComponent,
    PlayCardBodyComponent,
    PlayCardFooterComponent,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    PlayFormFieldComponent,
    PlayFormFieldLabelComponent,
    PlayInputTextComponent,
    PlaySelectComponent,
    PlayGroupComponent,
  ],
})
export class LmsUiContentCreateComponent {
  @HostBinding('class.lms-ui-content-create') lmsUiContentCreateClass =
    'lms-ui-content-create';

  contentTypeOptions = [...LMS_CONTENT_TYPES];

  form = this.fb.group<LmsUiContentCreateForm>({
    content_type: this.fb.control('VIDEO'),
    slide: this.fb.control(null),
    video: this.fb.group({
      description: this.fb.control('My Cool Description'),
      duration: this.fb.control('02:29'),
      name: this.fb.control('My Cool name'),
      thumbnail_url: this.fb.control('https://picsum.photos/200'),
      video_url: this.fb.control('https://www.youtube.com/watch?v=9bZkp7q19f0'),
    }),
  });

  closeDialog() {
    this.dialogRef.close();
  }

  saveAndCloseDialog() {
    const value = this.form.getRawValue();
    this.dialogRef.close(value);
  }

  constructor(
    private dialogRef: DialogRef<
      LmsContentItemCreate,
      LmsUiContentCreateComponent
    >,
    private fb: FormBuilder
  ) {}
}
