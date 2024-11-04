import { Component } from '@angular/core';
import { KeyboardModule } from '@app/keyboard/keyboard.module';
import { KeyboardToggleComponent } from '../keyboard-toggle/keyboard-toggle.component';
import { LangSwitcherComponent } from '../lang-switcher/lang-switcher.component';
import { Observable } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-button',
  standalone: true,
  template: `
    <a routerLink="/">
      <button
        class="btn btn-secondary home-btn"
        type="button"
        aria-expanded="false"
      >
        <img src="assets/home.svg" alt="home" />
      </button>
    </a>
  `,
  styles: [
    `
      .home-btn {
        border-radius: 50%;
        border: none;
        background-color: #169dd9;
        width: 30pt;
        height: 30pt;
        border: none;
        img {
          height: 16pt;
          transform: translateX(-2.5pt) translateY(-2pt);
        }
      }
    `,
  ],
  imports: [RouterModule],
})
export class HomeButtonComponent {
  visibleKeybToggle: Observable<boolean> = G.visibleKeybToggle;
}
