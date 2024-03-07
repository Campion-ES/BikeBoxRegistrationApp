import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { RegisterPageComponent } from './register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    ToKeybModule,
    PageWrapperComponent,
  ],
  declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
