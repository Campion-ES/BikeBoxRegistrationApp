///yarn add @myndmanagement/text-mask
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersAccountService, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals';

// import { luhnValidator } from 'src/app/_helpers/luhn/luhn.validator';
import { TLangNames } from '@app/_interfaces/interfaces';
import { CREDIT_DATA_MULTI, ICreditCardFieldsData } from './credit.card.data';
import { LangValidator } from '@app/_helpers/lang.validators';
import { CreditCardModel, IUserModel, UserModel } from '@app/_models';
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

const TO_LOG = true;

@UntilDestroy()
@Component({
  selector: 'and-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'CreditCardValidation';

  //#region Lang
  private _Lang!: TLangNames; // = GlobalLangPipe$.value;;
  public get Lang(): TLangNames {
    return this._Lang;
  }
  @Input()
  public set Lang(v: TLangNames) {
    if (this._Lang != v) {
      this._Lang = v;
      this._onLangChange(v);
    }
  }
  //#endregion
  active: string = '';
  paymentForm!: FormGroup;
  private user!: IUserModel; // = this.userSvc.userValue;

  model: CreditCardModel = <CreditCardModel>{};

  isSubmitted: boolean = false;
  cardValidate: boolean = false;
  cardDetailsValidate: boolean = false;
  cardType: string = 'Visa';
  //#region MASKS
  readonly maskCardNum = MASK_CARD_NUM;
  readonly maskPassportNum = MASK_PASSPORT_NUM;
  readonly maskTokefNum = MASK_TOKEF_NUM;
  readonly maskCvvNum = MASK_CVV_NUM;
  //#endregion
  subs: Subscription[] = [];

  flowType = FlowType.register;
  headerSize = HeaderSize.small;

  public constructor(
    private userSvc: UsersAccountService,
    private alertSvc: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subs.push(
      G.Lang$.subscribe((lan) => {
        this.Lang = lan;
      })
    );
  }
  flds!: ICreditCardFieldsData;

  async ngOnInit() {
    this.getFlowType();
    G.setVisibleKeybToggle(true);
    G.KeyboardVisible = true;
    this.subs.push(G.Lang$.subscribe((lang) => (this.Lang = lang)));
    this.Lang = G.Lang;
    this.IntializePaymentForm();
  }

  getFlowType() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.flowType = data['flowType']));
  }

  private _onLangChange(v: TLangNames, toValidate: boolean = true) {
    //this change language for validation strings
    // LangValidator.Lang = v;
    /// To event !!!

    this.flds = CREDIT_DATA_MULTI[v] as ICreditCardFieldsData; //{...USER_DATA_MULTI[this._Lang]};
    if (TO_LOG) {
      console.log(`Set Lang ${v}}`);
    }

    this._validateMe();
    return v;
  }

  private _validateMe() {
    if (!this.paymentForm) return;

    for (let controlName in this.paymentForm?.controls) {
      this.c(controlName)?.updateValueAndValidity();
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    G.KeyboardVisible = false;
  }

  ngAfterViewInit(): void {}

  c(controlName: string): FormControl {
    const ctrl = this.paymentForm.controls[controlName];
    return ctrl as FormControl;
  }
  //#region IntializePaymentForm
  IntializePaymentForm() {
    this.paymentForm = new FormGroup({
      firstName: new FormControl<string>('', [
        LangValidator.required('firstName'),
      ]),

      lastName: new FormControl<string>('', [
        LangValidator.required('lastName'),
      ]),

      passport: new FormControl<string>('', [
        LangValidator.required('passport'),
        //LangValidator.minLength("passport",9),
        LangValidator.teudatZehut('passport'),
        //
      ]),

      cardNumber: new FormControl<string>('', [
        LangValidator.required('cardNumber'),
        LangValidator.creditCardLuhn('cardNumber'),
      ]),

      tokef: new FormControl<string>('', [
        LangValidator.required('tokef'),
        LangValidator.cardExpired('tokef'),
      ]),

      cvv: new FormControl<string>('XXX', [
        LangValidator.required('cvv'),
        LangValidator.minLength('cvv', 3),
      ]),
    });

    this.paymentForm.patchValue(this.user);
  }
  get f() {
    return this.paymentForm.controls;
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

  //#endregion

  ctrl(ctrl: string): FormControl {
    return (this.paymentForm && this.paymentForm.get(ctrl)) as FormControl;
  }

  //#endregion

  tokef2date(): boolean {
    if (this.model.tokef && this.model.tokef.includes('/')) {
      const arr = this.model.tokef.split('/');
      if (arr.length >= 2) {
        let m = +arr[0].toString();
        m = m >= 1 && m <= 12 ? m : 1;
        this.model.cardMonth = m.toString();
        let y = +arr[1].toString() % 100;
        this.model.cardYear = (y + 2000).toString();
        return true;
      }
    }
    return false;
  }

  async saveCardDetails() {
    this.router.navigate([`${FlowType[this.flowType]}/success`]);
    // const hash = this.paymentForm.value;
    // this.model = { ...hash };

    // //debugger;

    // Object.entries(hash).forEach((entry) => {
    //   const [key, value] = entry;
    //   console.log(key, value);
    // });
    // const tokef = this.model['tokef'];
    // this.isSubmitted = true;
    // const ft = this.tokef2date();
    // let user = this.user;

    // if (ft && this.paymentForm.valid) {
    //   this.cardType = 'Visa'; //this.getCardType(this.paymentmodel.cardNumber)
    //   this.cardValidate = this.validateCCcard(
    //     +(this.model.cardMonth ?? '0'),
    //     +(this.model?.cardYear ?? '0')
    //   );
    //   if (this.cardValidate) this.cardDetailsValidate = true;

    //   this.user.tokef = tokef;
    //   try {
    //     await this.userSvc.saveUser$(this.user, true);

    //     this.alertSvc.success(`Your egistration succeded tokef=${tokef}`, {
    //       autoClose: true,
    //       keepAfterRouteChange: true,
    //     });
    //   } catch (err) {
    //     this.alertSvc.error('' + err);
    //   }

    //   ///!!! Here to call Card Service
    // } else {
    //   this.cardDetailsValidate = false;
    // }

    // console.log(this.model, this.cardType, this.cardValidate);
  }

  ClearCardDetails() {
    this.model = <CreditCardModel>{};
    this.paymentForm.reset();
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
}

// export interface IMonth {
//   text: string,
//   value: string,
// }

// export interface IYear {
//   text: string,
//   value: string,
// }
// export interface IMonth {
//   text: string,
//   value: string,
// }

// export interface IYear {
//   text: string,
//   value: string,
// }
//#region Set MonthLsit Yeras
//   GetMonths() {
//     for (let i = 1; i <= 12; i++) {
//       this.month = <IMonth>{};
//       if(i.toString().length == 1)
//       {
//         this.month.text = "0"+i.toString();
//         this.month.value = "0"+i.toString();
//       }
//       else
//       {
//         this.month.text = i.toString();
//         this.month.value = i.toString();
//       }

//       this.monthlist.push(this.month);
//     }
//   }
//   GetYears() {
//     let year = new Date().getFullYear();
//     for (let i = year; i <= year + 10; i++) {
//       this.year = <IYear>{};
//       this.year.text = i.toString();
//       this.year.value = i.toString();
//       this.years.push(this.year);
//     }
//   }
// //#endregion
//#region Card Mask fns
// cardMaskFunction(rawValue: string): Array<RegExp> {
//   const card = null;//getValidationConfigFromCardNo(rawValue);
//   if (card) {
//     return card.mask;
//   }
//   return [/\d/];
// }
