import {
  IInputFields,
  TDirection,
  TLangNames,
} from '@app/_interfaces/interfaces';

export interface IWellcomePageLangData {
  lang: TLangNames;
  direction: TDirection;
  wellcomeMessage: string;
  registerButtonText: string;
  updateCreditCardText: string;
}
//{  en:'', ru:'',he:'',ar:''}
/*
           {
               name:'';
               label: {  en:'', ru:'',he:'',ar:''},
               placeholder:  {  en:'', ru:'',he:'',ar:''}
               invalidFeedback?://{  en:'', ru:'',he:'',ar:''};
           }
*/

const SYSTEM_NAME = 'BIKEBOX';

const WELLCOME_EN: IWellcomePageLangData = {
  lang: 'en',
  direction: 'ltr',
  wellcomeMessage: `Wellcome to ${SYSTEM_NAME} system`,
  registerButtonText: 'Register',
  updateCreditCardText: 'Payment method update',
};
const WELLCOME_RU: IWellcomePageLangData = {
  lang: 'en',
  direction: 'ltr',
  wellcomeMessage: `Добро пожаловать в систему ${SYSTEM_NAME}`,
  registerButtonText: 'регистр',
  updateCreditCardText: 'Обновление способа оплаты',
};
const WELLCOME_HE: IWellcomePageLangData = {
  lang: 'he',
  direction: 'rtl',
  wellcomeMessage: `ברוך הבא למערכת ${SYSTEM_NAME}`,
  registerButtonText: 'הרשמה',
  updateCreditCardText: 'עדכון אמצעי תשלום',
};

const WELLCOME_AR: IWellcomePageLangData = {
  lang: 'ar',
  direction: 'rtl',
  wellcomeMessage: `مرحبا بكم في نظام ${SYSTEM_NAME}`,
  registerButtonText: 'تسجيل',
  updateCreditCardText: 'تحديث طريقة الدفع',
};
export interface IWellcomePageLangMulti {
  en: IWellcomePageLangData;
  ru: IWellcomePageLangData;
  he: IWellcomePageLangData;
  ar: IWellcomePageLangData;
}

export const WELLCOME_DATA_MULTI: Record<TLangNames, IWellcomePageLangData> = {
  en: WELLCOME_EN,
  ru: WELLCOME_RU,
  he: WELLCOME_HE,
  ar: WELLCOME_AR,
};
