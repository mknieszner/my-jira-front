import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import * as fromDefinitionModel from '../shared/table.model';
import {DataStorageService} from '../shared/data-storage.service';

export const COMMON_TABLE_ENVIRONMENT = "COMMON_TABLE_ENVIRONMENT";
export const SEPARATE_TABLE_ENVIRONMENT = "SEPARATE_TABLE_ENVIRONMENT";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  definitionForm: FormGroup;
  options = fromDefinitionModel.options;


  constructor(private dss: DataStorageService,
              ) {
  }
  ngOnInit() {
    this.initForm();
  }

  private initForm() {

    this.definitionForm = new FormGroup({
      'name': new FormControl(),
      'columnDetailDefinitionDtoList': new FormArray([])
    });
  }

  onAddColumn() {
    (<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).push(
      new FormGroup({
        'type': new FormControl('IN'),
        'name': new FormControl(''),
        'optionList': new FormArray([])
      })
    );
  }

  onAddOptions(i: number) {
    (<FormArray>(<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).at(i).get('optionList')).push(
      new FormControl()
    );
  }

  onDeleteOption(typeIndex: number, optionNumber: number) {
    (<FormArray>(<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList'))
      .at(typeIndex)
      .get('optionList'))
      .removeAt(optionNumber);
  }

  onDeleteColumn(i) {
    (<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).removeAt(i);
  }

  onResetForm() {
    this.initForm();
  }

  postSepareteTableForm() {
    this.postTableForm(SEPARATE_TABLE_ENVIRONMENT);
  }

  postCommonTableForm() {
    this.postTableForm(COMMON_TABLE_ENVIRONMENT);
  }

  private postTableForm(databaseEnviroment: string){
    const formValue = this.definitionForm.value;
    formValue['id'] = null;
    this.dss.postTableDefinition(formValue, databaseEnviroment);
  }

  getData() {
    return <FormArray>this.definitionForm.get('columnDetailDefinitionDtoList');
  }
}
