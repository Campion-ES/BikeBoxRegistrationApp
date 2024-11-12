import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, FormControlName, NgControl } from '@angular/forms';
import { Keyboard } from '@app/utils/keyb-lang.global';
import { environment } from '@environments/environment';
import { TLangNames2 } from '../types';

const TO_BLUR = environment.toBlurKey;

@Directive({
  selector: '[to-keyb]',
})
export class ToKeybDirective implements OnInit, OnDestroy {
  private static _Atttached?: ToKeybDirective;
  public static get Attached() {
    return ToKeybDirective._Atttached;
  }

  @Input('to-keyb') alterLang: string = ''; //alternative keyboard if exosts
  @HostBinding() name!: string;
  @HostBinding() id!: string;
  public f!: FormControl;

  constructor(
    private hostElt: ElementRef,
    public renderer: Renderer2,
    readonly ngControl: NgControl
  ) {}

  ngOnInit(): void {
    if (this.ngControl instanceof FormControlName) {
      const fcName = this.ngControl as FormControlName;
      this.f = fcName.control;
      this.name = '' + fcName.name;

      this.f = this.ngControl.control as FormControl;
      ///!!!

      if (!this.id || this.id.length < 1) {
        this.id = `id-input-to-keyb-${this.name}`;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.alterLang.length > 1) {
      Keyboard.clearAlterLang();
    }

    this.detachKeyboard();
  }

  @HostListener('focus')
  attachKeyboard() {
    this.detachKeyboard();
    ToKeybDirective._Atttached = this;
    this.hostElt.nativeElement.classList.add('attached-to-keyb');
    this.hostElt.nativeElement.setAttribute('attached', '');
    if (TO_BLUR && environment.toBlurKey) {
      this.hostElt.nativeElement.blur();
    }

    if (this.alterLang.length > 1) {
      Keyboard.setAlterLang(this.alterLang as TLangNames2);
    }
  }

  detachKeyboard() {
    const that = ToKeybDirective._Atttached;
    ToKeybDirective._Atttached = undefined;
    if (that) {
      if (that.alterLang.length > 1) {
        Keyboard.clearAlterLang();
      }
      that.hostElt.nativeElement.classList.remove('attached-to-keyb');
      this.hostElt.nativeElement.removeAttribute('attached');
    }
  }
}
