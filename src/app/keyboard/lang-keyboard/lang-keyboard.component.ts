import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
//import { TochangeKeyboardKeys } from '../akb-key/akb-key.component';
import {
  ALL_KEY_LAYOUTS,
  IsLtr,
  KeyHasCase,
} from '../keyboard.service';
import { Subscription } from 'rxjs';
import { TSubject } from 'src/app/_helpers/tsubject';
import { TranslocoService } from '@ngneat/transloco';
import { TLangNames } from '@app/_interfaces/interfaces';

@Component({
  selector: 'akb-lang-keyboard',
  templateUrl: './lang-keyboard.component.html',
  styleUrls: ['../keyboard.scss'],
})
export class LangKeyboardComponent implements OnInit, OnDestroy {
  service = inject(TranslocoService);
  public readonly capsLock$: TSubject<boolean> = new TSubject<boolean>(false);

  @Input('lang')
  public currentLang: string = this.service.getActiveLang() as TLangNames;

  public get isLtr(): boolean {
    return IsLtr(this.currentLang);
  }

  public keyLayout!: string[][];

  public get LangCaps(): boolean {
    return this.capsLock$.value;
  }
  public keyHasCase(key: string) {
    return KeyHasCase(key);
  }

  subscrArr: Subscription[] = [];
  _toggleCaps(): boolean {
    const ft = !this.LangCaps;
    console.log(`[${this.currentLang}]=>LangKeyboard.setCaps(${ft})`);
    return this.capsLock$.newNext(ft);
  }

  ngOnInit(): void {
    this.keyLayout = ALL_KEY_LAYOUTS[this.currentLang];
  }

  ngOnDestroy() {
    this.capsLock$?.destroy();
  }
  onCapsPress(key: string) {
    this._toggleCaps();
  }

  onKeyPress(key: string) {
    let c = key;
  }
}
