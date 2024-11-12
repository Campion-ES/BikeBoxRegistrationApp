import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TLangNames } from '@app/keyboard';
import { Keyboard } from '@app/utils/keyb-lang.global';
import { LangDefinition } from '@ngneat/transloco';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass, AsyncPipe],
})
export class LangSwitcherComponent implements OnInit {
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  activeLang$ = Keyboard.Lang$;

  ngOnInit(): void {
    Keyboard.setLang(this.service.getActiveLang() as TLangNames);
  }

  setLang(lang: string) {
    Keyboard.setLang(lang as TLangNames);
    this.service.setActiveLang(lang);
  }
}
