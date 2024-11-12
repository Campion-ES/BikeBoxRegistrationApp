export type TLangNames = 'en' | 'ru' | 'he' | 'ar';
export type TLangNames2 = TLangNames | 'dg';
export type TDirection = 'ltr' | 'rtl';
export interface ILang {
  lang: TLangNames;
  name: string;
  descr?: string;
}
export type TLang<T = string> = Record<TLangNames, T>;
export interface ITMultiLang<T = string> {
  en: T;
  ru: T;
  he: T;
  ar: T;
}
