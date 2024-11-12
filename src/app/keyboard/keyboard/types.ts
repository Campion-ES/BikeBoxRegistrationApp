export enum ECHR {
  errChr = -1, //
  chr = 0,
  chrCase = 1,
  caps = 2,
  cmd = 3,
}

export const KEY_LAYOUT_EN: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'done'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '-'],
  ['caps', '@', '.', 'space', ',', '/'],
];

export const KEY_LAYOUT_HE: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
  ["'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', '-'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', 'done'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '\\'],
  ['@', '.', 'space', ',', '/'],
];

export const KEY_LAYOUT_RU: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'э'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'done'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ъ'],
  ['caps', '@', '.', 'space', ',', '/'],
];

export const KEY_LAYOUT_AR: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', 'لإ', 'إ'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'لأ', 'أ'],
  ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'لآ', 'آ', '\\', ',', '/'],
  ['@', '.', 'space', ',', '/', '\\', 'done'],
];

export const KEY_LAYOUT_DG: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace', 'done'],
];
export interface IKeyLayout {
  [key: string]: string[][];
}

export const ALL_KEY_LAYOUTS: IKeyLayout = {
  en: KEY_LAYOUT_EN,
  ru: KEY_LAYOUT_RU,
  he: KEY_LAYOUT_HE,
  ar: KEY_LAYOUT_AR,
  dg: KEY_LAYOUT_DG,
};
