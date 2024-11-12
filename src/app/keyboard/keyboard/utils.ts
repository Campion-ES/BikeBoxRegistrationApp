import { ECHR } from "./types";

export function IsLtr(lan: string): boolean {
  return lan == 'en' || lan == 'ru';
}
export function KeyHasCase(key: string) {
  return (
    key.length === 1 &&
    ((key >= 'a' && key <= 'z') || (key >= 'а' && key <= 'я'))
  );
}

export function Chr2Enum(key: string): ECHR {
  let e = ECHR.errChr;
  if (key.length == 1) {
    e =
      (key >= 'a' && key <= 'z') || (key >= 'а' && key <= 'я')
        ? ECHR.chrCase
        : ECHR.chr;
  } else if (key.length == 2) {
    e = ECHR.chr;
  } else {
    e = key == 'caps' ? ECHR.caps : ECHR.cmd;
  }
  return e;
}
