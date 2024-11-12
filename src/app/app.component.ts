import { Component, inject, OnInit } from '@angular/core';
import { Keyboard } from '@app/utils/keyb-lang.global';
import { UserIdleService } from 'angular-user-idle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { TLangNames } from './keyboard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userIdle = inject(UserIdleService);
  private modalService = inject(NgbModal);
  ref = Keyboard.ref;

  public get IsKeyb(): boolean {
    return Keyboard.KeyboardVisible;
  }
  public set IsKeyb(v: boolean) {
    Keyboard.KeyboardVisible = v;
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
        this.modalService.dismissAll();
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
    Keyboard.setLang(lang);
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
