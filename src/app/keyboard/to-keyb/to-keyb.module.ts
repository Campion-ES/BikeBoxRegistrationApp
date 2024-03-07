import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToKeybDirective } from './to-keyb.directive';
import { Form2keybDirective } from './form2keyb.directive';
import { ErrInputPanelComponent } from './err-input-panel.component';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, TranslocoRootModule],
  declarations: [ToKeybDirective, Form2keybDirective, ErrInputPanelComponent],
  exports: [ToKeybDirective, Form2keybDirective, ErrInputPanelComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'errors', multi: true }],
})
export class ToKeybModule {}
