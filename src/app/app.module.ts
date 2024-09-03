import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { FakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';

import { KeyboardModule } from './keyboard/keyboard.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from './keyboard/to-keyb/to-keyb.module';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { LangSwitcherComponent } from './_components/lang-switcher/lang-switcher.component';
import { KeyboardToggleComponent } from './_components/keyboard-toggle/keyboard-toggle.component';
import { TranslocoRootModule } from './transloco-root.module';
import { ApiErrorMessageComponent } from './_components/api-error-message/api-error-message.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomePageComponent,
    LangSwitcherComponent,
    KeyboardToggleComponent,
    // SelectLanguageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    KeyboardModule,
    ToKeybModule,
    TextMaskModule,
    TranslocoRootModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    FakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
