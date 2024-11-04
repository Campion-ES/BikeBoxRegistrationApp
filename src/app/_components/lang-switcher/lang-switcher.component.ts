import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TLangNames } from '@app/_interfaces/interfaces';
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
  activeLang$ = G.Lang$;

  ngOnInit(): void {
    G.setLang(this.service.getActiveLang() as TLangNames);
  }

  setLang(lang: string) {
    G.setLang(lang as TLangNames);
    this.service.setActiveLang(lang);
  }
}
