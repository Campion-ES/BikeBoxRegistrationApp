import { Component, inject } from '@angular/core';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TLangNames } from '@app/_interfaces/interfaces';
import { LangDefinition } from '@ngneat/transloco';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss'],
})
export class LangSwitcherComponent {
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];

  setLang(lang: string) {
    G.setLang(lang as TLangNames);
    this.service.setActiveLang(lang);
  }
}
