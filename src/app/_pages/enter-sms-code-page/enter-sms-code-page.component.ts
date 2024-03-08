import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LangValidator } from '@app/_helpers/lang.validators';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { MASK_SMS_CODE } from '@app/_models/input-masks.constant';
import { GKeybLanGlobal as G } from '@app/_globals';

@Component({
  selector: 'app-enter-sms-code',
  templateUrl: './enter-sms-code-page.component.html',
  styleUrls: ['./enter-sms-code-page.component.scss'],
})
export class EnterSmsCodeComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  flowType = FlowType.paymentMethod;
  headerSize = HeaderSize.big;
  maskSmsCode = MASK_SMS_CODE;

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
      smsVerificationCode: new FormControl<string>('', [
        LangValidator.required('smsVerificationCode'),
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

  verifySms() {
    this.router.navigate(['payment-method/credit-card']);
  }

  ngOnDestroy(): void {
    G.KeyboardVisible = false;
  }
}
