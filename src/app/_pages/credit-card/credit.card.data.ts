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

export interface ICreditCardFieldsData {
  lang: TLangNames;
  direction: TDirection;
  title: string;
  title2: string;
  ownerFirstName: IInputFields;
  ownerLastName: IInputFields;
  //  ownerLastName:IInputFields;
  passport: IInputFields;
  cardNumber: IInputFields;
  tokef: IInputFields;
  cvv: IInputFields;
  saveButtonText: string;
}

const CREDIT_EN: ICreditCardFieldsData = {
  lang: 'en',
  direction: 'ltr',
  title: 'Credit Card Details',
  title2: 'Please enter credit card details',
  ownerFirstName: {
    name: 'firstName',
    label: 'Card owner first name*',
    placeholder: 'First Name ',
  },
  ownerLastName: {
    name: 'lastName',
    label: 'Card owner last name*',
    placeholder: 'Last name ',
  },

  passport: {
    name: 'passport',
    label: 'ID Number*',
    placeholder: 'ID number',
  },

  cardNumber: {
    name: 'cardNumber',
    label: 'Credit Card Number*',
    placeholder: '',
  },
  tokef: {
    name: 'tokef',
    label: 'Valid to*',
    placeholder: '',
  },

  cvv: {
    name: 'ccv',
    label: 'Security Code*',
    placeholder: '3 digits only',
  },
  saveButtonText: 'Save',
};
const CREDIT_RU: ICreditCardFieldsData = {
  lang: 'ru',
  direction: 'ltr',
  title: 'Данные кредитной карты',
  title2: 'Bведите данные кредитной карты',
  ownerFirstName: {
    name: 'firstName',
    label: 'Имя владельца карты*',
    placeholder: 'Имя владельца',
  },
  ownerLastName: {
    name: 'lastName',
    label: 'Фамилия владельца карты*',
    placeholder: 'Фамилия владельца',
  },

  passport: {
    name: 'passport',
    label: 'Удостоверение*',
    placeholder: 'Удостоверение личности',
  },

  cardNumber: {
    name: 'Nomer',
    label: 'Номер кредитной карты*',
    placeholder: 'Номер кредитной карты',
  },
  tokef: {
    name: 'tokef',
    label: 'действительна до*',
    placeholder: 'действительна до',
  },

  cvv: {
    name: 'ccv',
    label: 'Код безопасности*',
    placeholder: '3 digits only',
  },
  saveButtonText: 'Сохранять',
};

const CREDIT_HE: ICreditCardFieldsData = {
  lang: 'he',
  direction: 'rtl',
  title: 'פרטי כרטיס אשראי',
  title2: 'נא להזין את פרטי כרטיס האשראי',
  ownerFirstName: {
    name: 'firstName',
    label: 'שם פרטי של בעל הכרטיס*',
    placeholder: 'שם פרטי',
  },
  ownerLastName: {
    name: 'lastName',
    label: 'שם משפחה של בעל הכרטיס*',
    placeholder: 'שם משפחה',
  },

  passport: {
    name: 'passport',
    label: 'תעדת זהות*',
    placeholder: 'תעדת זהות',
  },

  cardNumber: {
    name: 'cardNumber',
    label: 'מספר כרטיס אשראי*',
    placeholder: 'מספר כרטיס אשראי',
  },
  tokef: {
    name: 'tokef',
    label: 'תוקף*',
    placeholder: 'MM/YY',
  },

  cvv: {
    name: 'ccv',
    label: 'קוד אבטחה*',
    placeholder: '3 digits only',
  },
  saveButtonText: 'שמור',
};

const CREDIT_AR: ICreditCardFieldsData = {
  lang: 'ar',
  direction: 'rtl',
  title: 'تفاصيل بطاقة الائتمان',
  title2: 'الرجاء إدخال تفاصيل بطاقة الائتمان',
  ownerFirstName: {
    name: 'firstName',
    label: 'الاسم الأول لحامل البطاقة',
    placeholder: 'الاسم الأول',
  },
  ownerLastName: {
    name: 'lastName',
    label: 'الاسم الأخير لحامل البطاقة*',
    placeholder: 'اسم عائلة',
  },

  passport: {
    name: 'passport',
    label: 'بطاقة تعريف*',
    placeholder: 'بطاقة تعريف',
  },

  cardNumber: {
    name: 'cardNumber',
    label: 'رقم البطاقة الائتمانية*',
    placeholder: 'رقم البطاقة الائتمانية',
  },
  tokef: {
    name: 'tokef',
    label: 'صالحة ل*',
    placeholder: 'MM/YY',
  },

  cvv: {
    name: 'ccv',
    label: 'كود الحماية CVV*',
    placeholder: '3 digits only',
  },
  saveButtonText: 'إحفظ',
};

export interface ICreditCardFieldsMulti {
  en: ICreditCardFieldsData;
  ru: ICreditCardFieldsData;
  he: ICreditCardFieldsData;
  ar: ICreditCardFieldsData;
}
//ICreditCardFieldsMulti = //

export const CREDIT_DATA_MULTI: Record<TLangNames, ICreditCardFieldsData> = {
  en: CREDIT_EN,
  //dg: CREDIT_EN,
  ru: CREDIT_RU,
  he: CREDIT_HE,
  ar: CREDIT_AR,
};
