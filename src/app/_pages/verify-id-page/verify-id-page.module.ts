import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyIdPageComponent } from './verify-id-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: VerifyIdPageComponent }];

@NgModule({
  declarations: [VerifyIdPageComponent],
  imports: [
    CommonModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    PageWrapperComponent,
    TranslocoRootModule,
    ReactiveFormsModule,
    ToKeybModule,
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'verify-id-page', multi: true },
  ],
})
export class VerifyIdPageModule {}
