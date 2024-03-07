import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
export type TErrLang = { name: string; lang: string };
const TO_LOG = false;

@Component({
  selector: 'and-err-input-panel',
  template: `
    <label
      class="err-input-panel"
      [style.visibility]="isErrs ? 'visible' : 'hidden'"
    >
      <div class="invalid-feedback" *ngFor="let err of errArr">
        {{ err.lang }}
      </div>
    </label>
  `,
  styles: [
    `
      .err-input-panel {
        background-color: white !important;
        color: magenta !important;
        font-weight: 500 !important;
        height: 1.5em;
      }
      .invalid-feedback {
        display: block;
        margin-top: 0;
      }
    `,
  ],
})
export class ErrInputPanelComponent implements OnInit {
  @Input('name') controlName!: string;

  @Input('f') f!: any;
  control!: FormControl;

  ngOnInit(): void {
    this.control = this.f[this.controlName] as FormControl;
    // throw new Error('Method not implemented.');
  }
  get isErrs() {
    const ft = this.control && this.control?.touched && !!this.control.errors;
    if (TO_LOG) {
      console.log(`isErrs(${this.controlName})=${ft}`);
    }

    return ft;
  }
  get errArr(): TErrLang[] {
    const errArr = new Array<TErrLang>();
    if (this.isErrs) {
      const controlErrors: ValidationErrors = this.control.errors ?? [];
      let langErr = '';
      Object.keys(controlErrors).forEach((nameError) => {
        if (controlErrors[nameError].lang) {
          langErr = controlErrors[nameError].lang;
        } else {
          const objError = controlErrors[nameError];
          langErr = 'native:' + JSON.stringify(objError, undefined, 2);
        }
        errArr.push({ name: nameError, lang: langErr });

        if (TO_LOG) {
          console.log('name: ' + nameError + ', err value: ', langErr);
        }
      });
    }
    return errArr;
  }

  err(errName: string): ValidationErrors | null {
    const errors = this.control?.errors;
    return errors ? errors[errName] : null;
  }
}
