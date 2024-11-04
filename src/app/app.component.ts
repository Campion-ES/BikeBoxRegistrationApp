import { Component, inject, OnInit } from '@angular/core';
import { GPage } from './_services';
import { IUserModel } from './_models';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { TLangNames } from './_interfaces/interfaces';
import { epg } from '@app/_interfaces/interfaces';
import { environment } from '@environments/environment';
import { UserIdleService } from 'angular-user-idle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userIdle = inject(UserIdleService);
  env = environment;
  epg = epg;
  // get user() {return GUser};
  user: IUserModel | undefined;
  get page() {
    return GPage;
  }
  ref = G.ref;

  public get IsKeyb(): boolean {
    return G.KeyboardVisible;
  }
  public set IsKeyb(v: boolean) {
    G.KeyboardVisible = v;
  }

  ngOnInit() {
    this.IsKeyb = false;

    this.userIdle.startWatching();
    this.userIdle
      .onTimerStart()
      .pipe(untilDestroyed(this))
      .subscribe((count) => console.log(count));
    this.userIdle
      .onTimeout()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/wellcome']);
        this.userIdle.resetTimer();
      });
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
