import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersAccountService, GPage } from './_services';
import { IUserModel } from './_models';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TLangNames } from './_interfaces/interfaces';
import { Subscription } from 'rxjs';
import { epg } from '@app/_interfaces/interfaces';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  env = environment;
  epg = epg;
  // get user() {return GUser};
  user: IUserModel | undefined;
  get page() {
    return GPage;
  }
  ref = G.ref;

  readonly subs: Subscription[] = [];

  constructor(private userSvc: UsersAccountService) {
    this.subs.push(this.userSvc.user$.subscribe((x) => (this.user = x)));
  }

  public get IsKeyb(): boolean {
    return G.KeyboardVisible;
  }
  public set IsKeyb(v: boolean) {
    G.KeyboardVisible = v;
  }

  ngOnDestroy(): void {
    this.subs.forEach((u) => u.unsubscribe());
  }
  ngOnInit() {
    this.IsKeyb = false;
  }

  async gotoExit$() {
    await this.userSvc.gotoExit$();
  }

  toShowKeyb() {
    if (!this.IsKeyb) this.IsKeyb = true;
  }
  toHideKeyb() {
    if (this.IsKeyb) this.IsKeyb = false;
  }
  setLang(lang: TLangNames) {
    G.setLang(lang);
  }

  save(data: string, filename: string) {
    const nav = window.navigator as any;
    const blob = new Blob([data], { type: 'text' });

    if (nav.msSaveOrOpenBlob) {
      (window.navigator as any).msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }
}
