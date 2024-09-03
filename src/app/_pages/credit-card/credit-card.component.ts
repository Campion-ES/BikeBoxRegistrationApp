import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals';
import { LangValidator } from '@app/_helpers/lang.validators';
import {
  MASK_CARD_NUM,
  MASK_CVV_NUM,
  MASK_PASSPORT_NUM,
  MASK_TOKEF_NUM,
} from '@app/_models/input-masks.constant';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RegisterService } from '@app/_services/register.service';
import { PaymentMethodDetails } from '@app/_models/payment-method-details.model';
import { BikeboxResponse, ResponseCode } from '@app/_models/response.model';
import { VerificationData } from '@app/_models/verification.model';

@UntilDestroy()
@Component({
  selector: 'and-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy {
  private readonly registerService = inject(RegisterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  paymentForm!: FormGroup;
  model: { month: string; year: string } = <{ month: string; year: string }>{};
  apiStatusCode = '';

  readonly maskCardNum = MASK_CARD_NUM;
  readonly maskPassportNum = MASK_PASSPORT_NUM;
  readonly maskTokefNum = MASK_TOKEF_NUM;
  readonly maskCvvNum = MASK_CVV_NUM;

  flowType = FlowType.register;
  headerSize = HeaderSize.small;

  async ngOnInit() {
    this.getFlowType();
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
        this.IntializePaymentForm(data);
      });
  }

  getFlowType() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.flowType = data['flowType']));
  }

  IntializePaymentForm(data: VerificationData) {
    this.paymentForm = new FormGroup({
      firstName: new FormControl<string>('', [
        LangValidator.required('firstName'),
      ]),

      lastName: new FormControl<string>('', [
        LangValidator.required('lastName'),
      ]),

      cardNumber: new FormControl<string>('', [
        LangValidator.required('cardNumber'),
        LangValidator.creditCardLuhn('cardNumber'),
      ]),

      tokef: new FormControl<string>('', [
        LangValidator.required('tokef'),
        LangValidator.cardExpired('tokef'),
      ]),

      cvv: new FormControl<string>('XXX', [LangValidator.required('cvv')]),
      user_id: new FormControl<string>(data.userId),
    });
  }
  get f() {
    return this.paymentForm.controls;
  }
  getClasses(cname: string) {
    const fc = this.f[cname] as FormControl;

    const c = {
      'is-invalid': !!fc?.touched && !fc?.valid,
      'is-valid': !!fc?.valid,
    };
    return c;
  }

  //#endregion

  ctrl(ctrl: string): FormControl {
    return (this.paymentForm && this.paymentForm.get(ctrl)) as FormControl;
  }

  //#endregion

  tokef2date(formData: any): boolean {
    if (formData.tokef && formData.tokef.includes('/')) {
      const arr = formData.tokef.split('/');
      if (arr.length >= 2) {
        let m = +arr[0].toString();
        m = m >= 1 && m <= 12 ? m : 1;
        this.model.month = m.toString();
        let y = +arr[1].toString() % 100;
        this.model.year = (y + 2000).toString();
        return true;
      }
    }
    return false;
  }

  async saveCardDetails() {
    this.apiStatusCode = '';
    const { value, valid } = this.paymentForm;

    if (!valid) {
      return;
    }

    if (this.tokef2date(value)) {
      const paymentMethodDetails: PaymentMethodDetails = {
        fields: {
          card_holder: `${value.firstName} ${value.lastName}`,
          card_number: value.cardNumber,
          month: this.model.month,
          year: this.model.year,
          cv: value.cvv,
        },
        user_id: value.user_id,
      };

      this.registerService
        .savePaymentMethod(paymentMethodDetails)
        .subscribe((res: BikeboxResponse) => {
          if (res.code === ResponseCode.SuccessUpdatePaymentMethod) {
            this.router.navigate([`${this.flowType}/success`]);
          } else {
            this.apiStatusCode = res.code.toString();
          }
        });
    }
  }

  validateCCcard(month: number, year: number) {
    let ptDatePattern = '^((0[1-9])|(1[0-2]))/([0-9]{4})$';
    let datevalue = month + '/' + year;
    if (datevalue.match(ptDatePattern)) return true;
    else {
      let todayDate = new Date();
      // const year = Number(value.substr(2, 4));
      // const month = Number(value.substr(0, 2));
      let controlDate = new Date(year, month - 1, 1, 23, 59, 59);
      let dateCompare = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1,
        0,
        0,
        0
      );
      //  let controlDate = new Date(control.value);
      if (dateCompare > controlDate) {
        return true;
      }
    }

    return false;
  }

  ngOnDestroy(): void {
    G.KeyboardVisible = false;
  }
}
