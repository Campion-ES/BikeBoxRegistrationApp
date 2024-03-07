import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
//import {GKeybLanGlobal as G} from

//import { GLangNamesArray, RefKeybVisible, RefKeyboardLang, SetAlternateLng, SetGlobalLang, KeybLangPipe$, GlobalLangPipe$ } from 'src/app/keyb-data/keyb.data';
//import { TLangNames } from 'src/app/interfaces/interfaces';
//import { keybLangPipe$ } from 'src/app/svc/gdata.service';
//type TAlterLang = TLangNames | '';

@Component({
  selector: 'and-keyboard-multi',
  templateUrl: './keyboard-multi.component.html',
  styleUrls: ['../keyboard.scss'],
})
export class KeyboardMultiComponent implements OnInit, OnDestroy {
  ref = G.ref; //.keybVisible;

  @Input()
  subscrArr: Subscription[] = [];
  constructor(readonly kbsrv: KeyboardService) {}
  Lang: string = G.Lang;

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
    // this.refVisible =  {visible:true};
    // RefKeybVisible.visible =  true;//{visible:true};
    G.KeyboardVisible = false;
  }

  toHideKeyb() {
    // this.refVisible = {visible:false};
    G.KeyboardVisible = false;
    //RefKeybVisible.visible =  false;
  }
}
