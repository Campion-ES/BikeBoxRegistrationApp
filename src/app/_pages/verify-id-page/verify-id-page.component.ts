import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LangValidator } from '@app/_helpers/lang.validators';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { MASK_PASSPORT_NUM } from '@app/_models/input-masks.constant';
import { GKeybLanGlobal as G } from '@app/_globals';

@Component({
  selector: 'app-verify-id-page',
  templateUrl: './verify-id-page.component.html',
  styleUrls: ['./verify-id-page.component.scss'],
})
export class VerifyIdPageComponent implements OnDestroy {
  form!: FormGroup;

  flowType = FlowType.paymentMethod;
  headerSize = HeaderSize.big;
  maskPassportNum = MASK_PASSPORT_NUM;

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    G.setVisibleKeybToggle(true);
    G.KeyboardVisible = true;
    this.intializeForm();
  }
  intializeForm() {
    this.form = new FormGroup({
      passport: new FormControl<string>('', [
        LangValidator.required('passport'),
        LangValidator.teudatZehut('passport'),
      ]),
    });
  }

  getClasses(cname: string) {
    const fc = this.f[cname] as FormControl;

    const c = {
      'is-invalid': !!fc?.touched && !fc?.valid,
      'is-valid': !!fc?.valid,
      // 'is-active': cname === this.active
    };
    return c;
  }

  verifyId() {
    this.router.navigate(['payment-method/enter-sms']);
  }

  ngOnDestroy(): void {
    G.KeyboardVisible = false;
  }
}
