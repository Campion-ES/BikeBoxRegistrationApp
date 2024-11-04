import { Component } from '@angular/core';
import { GKeybLanGlobal as G } from '@app/_globals/keyb-lang.global';

@Component({
  selector: 'app-keyboard-toggle',
  templateUrl: './keyboard-toggle.component.html',
  styleUrls: ['./keyboard-toggle.component.scss'],
  standalone: true,
})
export class KeyboardToggleComponent {
  visible:boolean = false;

  public get KeyboardVisible(): boolean {
    return G.KeyboardVisible;
  }
  public set KeyboardVisible(v: boolean) {
    G.KeyboardVisible = v;
  }
}
