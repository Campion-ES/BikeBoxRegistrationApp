import {
  IInputFields,
  TDirection,
  TLangNames,
} from 'src/app/_interfaces/interfaces';
// export interface IInputFields{
//    name:string;
//    label: string;
//    placeholder: string;
//    invalidFeedback?: string;
// }

export interface ISuccessPageFieldsData {
  lang: TLangNames;
  direction: TDirection;
  registerMessage: string;
  paymentMethodMessage: string;
}

const SUCCESS_PAGE_EN: ISuccessPageFieldsData = {
  lang: 'en',
  direction: 'ltr',
  registerMessage:
    'Your registration to the BIKEBOX system has been successfully completed!',
  paymentMethodMessage: 'Payment method has been updated successfully!',
};
const SUCCESS_PAGE_RU: ISuccessPageFieldsData = {
  lang: 'ru',
  direction: 'ltr',
  registerMessage: 'Ваша регистрация в системе BIKEBOX успешно завершена!',
  paymentMethodMessage: 'Способ оплаты успешно обновлен!',
};

const SUCCESS_PAGE_HE: ISuccessPageFieldsData = {
  lang: 'he',
  direction: 'rtl',
  registerMessage: 'רישומך למערכת BIKEBOX בוצע בהצלחה!',
  paymentMethodMessage: '',
};

const SUCCESS_PAGE_AR: ISuccessPageFieldsData = {
  lang: 'ar',
  direction: 'rtl',
  registerMessage: 'لقد اكتمل تسجيلك في نظام BIKEBOX بنجاح!',
  paymentMethodMessage: 'تم تحديث طريقة الدفع بنجاح!',
};

export interface ISuccessCardFieldsMulti {
  en: ISuccessPageFieldsData;
  ru: ISuccessPageFieldsData;
  he: ISuccessPageFieldsData;
  ar: ISuccessPageFieldsData;
}
//ICreditCardFieldsMulti = //

export const SUCCESS_PAGE_DATA_MULTI: Record<TLangNames, ISuccessPageFieldsData> = {
  en: SUCCESS_PAGE_EN,
  //dg: SUCCESS_PAGE_EN,
  ru: SUCCESS_PAGE_RU,
  he: SUCCESS_PAGE_HE,
  ar: SUCCESS_PAGE_AR,
};
