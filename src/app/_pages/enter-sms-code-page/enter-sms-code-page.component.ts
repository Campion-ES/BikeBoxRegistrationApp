import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LangValidator } from '@app/_helpers/lang.validators';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { MASK_SMS_CODE } from '@app/_models/input-masks.constant';
import { GKeybLanGlobal as G } from '@app/_globals';
import { RegisterService } from '@app/_services/register.service';
import { filter, map } from 'rxjs';
import { BikeboxResponse, ResponseCode } from '@app/_models/response.model';
import { VerificationData } from '@app/_models/verification.model';

@Component({
  selector: 'app-enter-sms-code',
  templateUrl: './enter-sms-code-page.component.html',
  styleUrls: ['./enter-sms-code-page.component.scss'],
})
export class EnterSmsCodeComponent implements OnInit, OnDestroy {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  form!: FormGroup;
  flowType = FlowType.paymentMethod;
  headerSize = HeaderSize.big;
  maskSmsCode = MASK_SMS_CODE;
  phone: string | null = '';
  apiStatusCode = '';

  get f() {
    return this.form?.controls;
  }

  ngOnInit(): void {
    G.setVisibleKeybToggle(true);
    G.KeyboardVisible = true;

    this.registerService.verificationData$
      .pipe(
        filter((data) => {
          return data !== undefined;
        }),
        map((data: VerificationData | undefined) => {
          return data!;
        })
      )
      .subscribe((data: VerificationData) => {
        this.intializeForm(data);
      });
  }
  intializeForm(data: VerificationData) {
    this.form = new FormGroup({
      user: new FormControl<string>(data.phone),
      pass: new FormControl<string>('', [LangValidator.required('pass')]),
    });
  }

  getClasses(cname: string) {
    const fc = this.f[cname] as FormControl;

    const c = {
      'is-invalid': !!fc?.touched && !fc?.valid,
      'is-valid': !!fc?.valid,
    };
    return c;
  }

  verifyBySms() {
    this.apiStatusCode = '';
    const { value, valid } = this.form;

    if (!valid) {
      return;
    }

    this.registerService
      .verifyBySms(value)
      .subscribe((res: BikeboxResponse) => {
        if (res.code === ResponseCode.Ok) {
          this.router.navigate(['payment-method/credit-card']);
        } else {
          this.apiStatusCode = res.code.toString();
          this.form.reset();
        }
      });
  }

  ngOnDestroy(): void {
    G.KeyboardVisible = false;
  }
}
