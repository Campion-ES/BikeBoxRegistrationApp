import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Keyboard } from '../../utils/keyb-lang.global';

@Directive({
  selector: '[form2keyb]',
})
export class Form2keybDirective implements OnInit, AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];
  private inpits: HTMLInputElement[] = [];
  @Output() onExitInput: EventEmitter<string> = new EventEmitter<string>();

  constructor(private hostElt: ElementRef, public renderer: Renderer2) {
    this.subs.push(Keyboard.KeyboardEnter$.subscribe((intr) => this.OnKeyEnter(intr)));
  }
  ngOnDestroy(): void {
    this.subs.forEach((subs) => subs.unsubscribe());
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    const native = this.hostElt.nativeElement as HTMLElement;
    const list: NodeListOf<HTMLInputElement> =
      native.querySelectorAll('[to-keyb]');
    list.forEach((elt) => this.inpits.push(elt));

    let str = this.inpits.map((p) => p.name).join();
    if (this.inpits.length > 0) {
      this.inpits[0].focus();
    }
  }

  // @HostListener("keyup.enter")
  @HostListener('document:keyup.enter', ['$event'])
  KeyUpEvent(event: KeyboardEvent) {
    this.OnKeyEnter();
  }

  OnKeyEnter(intr: string = '??'): void {
    const cname: string = Keyboard.AttachedControlName;
    if (cname.length > 0) {
      // debugger;
      this.onExitInput.emit(cname);

      const ctrl = this.searchNewFocus(cname);
      ctrl?.focus();
    }
  }
  searchNewFocus(cname: string): HTMLInputElement | null {
    const len = this.inpits.length;

    if (len < 2) {
      return null;
    }
    let i = 0;
    if (cname.length <= 0) {
      return this.inpits[0];
    }
    for (; i < len; i++) {
      const element = this.inpits[i];
      if (element.name === cname) {
        i++;
        break;
      }
    }
    const ret = i < len ? this.inpits[i] : this.inpits[0];
    return ret;
  }
}
