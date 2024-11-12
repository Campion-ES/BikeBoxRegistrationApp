import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { TLangNames } from '../../types';
import { ALL_KEY_LAYOUTS } from '../types';
import { IsLtr, KeyHasCase } from '../utils';

@Component({
  selector: 'akb-lang-keyboard',
  templateUrl: './lang-keyboard.component.html',
  styleUrls: ['../keyboard.scss'],
})
export class LangKeyboardComponent implements OnInit, OnDestroy {
  service = inject(TranslocoService);
  public readonly capsLock$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

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
    this.capsLock$.next(ft);
    return ft;
  }

  ngOnInit(): void {
    this.keyLayout = ALL_KEY_LAYOUTS[this.currentLang];
  }

  ngOnDestroy() {
    this.capsLock$?.unsubscribe();
  }
  onCapsPress(key: string) {
    this._toggleCaps();
  }

  onKeyPress(key: string) {
    let c = key;
  }
}
