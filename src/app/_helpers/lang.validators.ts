import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HashMap } from '@ngneat/transloco';
//import { GetGlobalLang } from '../keyb-data/keyb.data';

const TO_LOG = false;
export function nullValidator(
  control: AbstractControl
): ValidationErrors | null {
  return null;
}
export const luhnCheck = (cardNumber: string): boolean => {
  if (!cardNumber?.length) {
    return false;
  }
  // Remove all except digits from card number.
  cardNumber = cardNumber.replace(/\D/g, '');

  if (cardNumber == '1111111111111111') {
    //TRICK!!!
    return true;
  }

  // 1. Remove last digit;
  const lastDigit = Number(cardNumber[cardNumber.length - 1]);

  // 2. Reverse card number
  const reverseCardNumber = cardNumber
    .slice(0, cardNumber.length - 1)
    .split('')
    .reverse()
    .map((x) => Number(x));
  let sum = 0;

  // 3. + 4. Multiply by 2 every digit on odd position. Subtract 9 if digit > 9
  for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
    reverseCardNumber[i] = reverseCardNumber[i] * 2;
    if (reverseCardNumber[i] > 9) {
      reverseCardNumber[i] = reverseCardNumber[i] - 9;
    }
  }

  // 5. Make the sum of obtained values from step 4.
  sum = reverseCardNumber.reduce((acc, currValue) => acc + currValue, 0);

  // 6. Calculate modulo 10 of the sum from step 5. and the last digit. If it's 0, you have a valid card number :)
  return (sum + lastDigit) % 10 === 0;
};

function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return (
    value != null &&
    (typeof value === 'number' || typeof value.length === 'number')
  );
}

function teudatZehutValidator(id: string) {
  // debugger;
  if (isNaN(+id) || id.length !== 9) {
    // Make sure ID is formatted properly
    return false;
  }
  let sum = 0,
    incNum = 0;
  for (let i = 0; i < id.length; i++) {
    incNum = Number(id[i]) * ((i % 2) + 1); // Multiply number by 1 or 2
    sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
  }
  const s = sum % 10;
  console.log('@@@', id, s);

  return s === 0;
}

function isEmptyInputValue(value: any): boolean {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  const b =
    value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
  return b;
}

export class LangValidator {
  constructor() {}

  private static _addMsgLang(
    errName: string,
    errs: ValidationErrors = {},
    errNameOld: string = '',
    params: HashMap = {}
  ) {
    errName = `errors.${errName}`;
    const ret: any = {};
    ret[errName] = {};
    ret[errName].params = params;

    if (!!errNameOld) {
      ret[errName].value = { ...errs[errNameOld] };
      delete ret[errNameOld];
    } else {
      ret[errName].value = { ...errs[errName] };
    }
    return ret;
  }
  static required(controlName: string): ValidatorFn {
    //{'required': true}
    return (control: AbstractControl): ValidationErrors | null => {
      const errs = Validators.required(control);
      if (!!errs && errs['required']) {
        const ret = LangValidator._addMsgLang('required', errs);
        return ret;
      } else {
        return null;
      }
    };
  }

  static requiredTrue(controlName: string): ValidatorFn {
    //{'required': true}
    return (control: AbstractControl): ValidationErrors | null => {
      const errs = Validators.requiredTrue(control);

      if (!!errs && errs['required']) {
        const ret = LangValidator._addMsgLang(
          `${controlName}RequiredTrue`,
          errs,
          'required'
        );
        return ret;
      } else {
        return null;
      }
    };
  }

  static email(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //// {email: true}
      let errs = Validators.email(control);
      if (!!errs && errs['email']) {
        const ret = LangValidator._addMsgLang('email', errs);
        return ret;
      } else {
        return null;
      }
    };
  }
  static number(
    controlName: string,
    minDigits: number = 7,
    maxDigits: number = 12
  ): ValidatorFn {
    // const name = controlName;
    maxDigits = minDigits > maxDigits ? minDigits : maxDigits;

    const patternRegex =
      minDigits === maxDigits
        ? `^[0-9]{${minDigits}}$`
        : `^[0-9]{${minDigits},${maxDigits}}$`;

    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return nullValidator;
        //   // don't validate empty values to allow optional controls
      }

      let errs = Validators.pattern(patternRegex)(control);

      const params: HashMap = {
        minDigits: minDigits,
        maxDigits: maxDigits,
      };

      if (!!errs && errs['pattern']) {
        const ret = LangValidator._addMsgLang(
          'phoneNumber',
          errs,
          'pattern',
          params
        );

        return ret;
      } else {
        return null;
      }
    };
  }

  static teudatZehut(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value && !hasValidLength(control))) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }
      let ft = teudatZehutValidator(control.value);

      let value = control?.value ?? '';
      //// {maxlength: {requiredLength: 3, actualLength: 2, msg: "bckg"}}

      if (!ft) {
        const ret = LangValidator._addMsgLang('teudatZehut', {
          teudatZehut: false,
          value: value,
        });
        return ret;
      } else {
        return null;
      }
    };
  }

  static creditCardLuhn(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value && !hasValidLength(control))) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }
      let ft = luhnCheck(control.value);

      if (!ft) {
        const ret = LangValidator._addMsgLang('creditCard', {
          teudatZehut: false,
        });
        return ret;
      } else {
        return null;
      }
    };
  }

  static cardExpired(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value && !hasValidLength(control))) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }

      const tokef: string = control.value?.toString() ?? '';

      let arr: string[] = [];

      if (
        tokef.length < 5 ||
        tokef[2] != '/' ||
        (arr = tokef.split('/')).length < 2
      ) {
        return LangValidator._addMsgLang(`${controlName}DateFormat`);
      }

      let month = +arr[0].toString();

      if (month < 1 && month > 12) {
        return LangValidator._addMsgLang(`${controlName}DateFormat`);
      }

      let year = +arr[1].toString() % 100;
      year = year + 2000;
      const dateNow = new Date();
      const dateTokef = new Date(year, month - 1, 1, 23, 59, 59);
      if (dateNow.getTime() > dateTokef.getTime()) {
        return LangValidator._addMsgLang(`${controlName}DateExpired`);
      }

      return null;
    };
  }
}
