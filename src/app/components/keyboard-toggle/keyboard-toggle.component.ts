import { Component } from '@angular/core';
import { Keyboard } from '@app/utils/keyb-lang.global';

@Component({
  selector: 'app-keyboard-toggle',
  templateUrl: './keyboard-toggle.component.html',
  styleUrls: ['./keyboard-toggle.component.scss'],
  standalone: true,
})
export class KeyboardToggleComponent {
  visible:boolean = false;

  public get KeyboardVisible(): boolean {
    return Keyboard.KeyboardVisible;
  }
  public set KeyboardVisible(v: boolean) {
    Keyboard.KeyboardVisible = v;
  }
}
