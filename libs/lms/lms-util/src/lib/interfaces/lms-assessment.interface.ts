import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface LmsAssessmentAnswer {
  answer: string;
  is_correct: boolean;
}

export interface LmsAssessmentQuestion {
  question: string;
  answers: LmsAssessmentAnswer[];
}

export interface LmsAssessment {
  questions: LmsAssessmentQuestion[];
}

export const getLmsAssessment = (): LmsAssessment => ({
  questions: [],
});

export interface LmsAssessmentAnswerForm {
  answer: FormControl<string>;
  is_correct: FormControl<boolean>;
}

export interface LmsAssessmentQuestionForm {
  question: FormControl<string>;
  answers: FormArray<FormGroup<LmsAssessmentAnswerForm>>;
}

export interface LmsAssessmentForm {
  questions: FormArray<FormGroup<LmsAssessmentQuestionForm>>;
}

export const getLmsAssessmentForm = (
  assessment: LmsAssessment
): FormGroup<LmsAssessmentForm> => {
  const lmsAssessmentForm: LmsAssessmentForm = {
    questions: new FormArray<FormGroup<LmsAssessmentQuestionForm>>([]),
  };

  assessment.questions.forEach((question) => {
    const questionForm: LmsAssessmentQuestionForm = {
      question: new FormControl(question.question),
      answers: new FormArray<FormGroup<LmsAssessmentAnswerForm>>([]),
    };

    question.answers.forEach((answer) => {
      const answerForm: LmsAssessmentAnswerForm = {
        answer: new FormControl(answer.answer),
        is_correct: new FormControl(answer.is_correct),
      };

      questionForm.answers.push(
        new FormGroup<LmsAssessmentAnswerForm>(answerForm)
      );
    });

    lmsAssessmentForm.questions.push(
      new FormGroup<LmsAssessmentQuestionForm>(questionForm)
    );
  });

  return new FormGroup(lmsAssessmentForm);
};
