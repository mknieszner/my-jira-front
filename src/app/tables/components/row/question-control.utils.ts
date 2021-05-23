import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionBase} from './value-types/question-base.model';

export abstract class QuestionControlUtils {

  static toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
