import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Keyboard } from '@app/utils/keyb-lang.global';
import { TranslocoService } from '@ngneat/transloco';
import { TLangNames } from '../../types';

@Component({
  selector: 'keyboard',
  templateUrl: './keyboard-multi.component.html',
  styleUrls: ['../keyboard.scss'],
})
export class KeyboardMultiComponent implements OnInit, OnDestroy {
  ref = Keyboard.ref;
  service = inject(TranslocoService);

  @Input()
  subscrArr: Subscription[] = [];
  Lang: string = this.service.getActiveLang() as TLangNames;

  ngOnInit(): void {
    this.subscrArr.push(
      Keyboard.KeybLang$.subscribe((lang) => {
        this.Lang = lang;
        `sent pipe ${this.Lang}`;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscrArr.forEach((p) => p?.unsubscribe());
  }
  toShowKeyb() {
    Keyboard.KeyboardVisible = false;
  }

  toHideKeyb() {
    Keyboard.KeyboardVisible = false;
  }
}
