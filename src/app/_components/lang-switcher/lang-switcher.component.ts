import { Component } from '@angular/core';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TLangNames } from '@app/_interfaces/interfaces';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss'],
})
export class LangSwitcherComponent {
  setLang(lang: TLangNames) {
    G.setLang(lang);
  }
}
