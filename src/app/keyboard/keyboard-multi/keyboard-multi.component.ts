import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TranslocoService } from '@ngneat/transloco';
import { TLangNames } from '@app/_interfaces/interfaces';

@Component({
  selector: 'keyboard',
  templateUrl: './keyboard-multi.component.html',
  styleUrls: ['../keyboard.scss'],
})
export class KeyboardMultiComponent implements OnInit, OnDestroy {
  ref = G.ref;
  service = inject(TranslocoService);

  @Input()
  subscrArr: Subscription[] = [];
  constructor(readonly kbsrv: KeyboardService) {}
  Lang: string = this.service.getActiveLang() as TLangNames;

  ngOnInit(): void {
    this.subscrArr.push(
      G.KeybLang$.subscribe((lang) => {
        this.Lang = lang;
        `sent pipe ${this.Lang}`;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscrArr.forEach((p) => p?.unsubscribe());
  }
  toShowKeyb() {
    G.KeyboardVisible = false;
  }

  toHideKeyb() {
    G.KeyboardVisible = false;
  }
}
