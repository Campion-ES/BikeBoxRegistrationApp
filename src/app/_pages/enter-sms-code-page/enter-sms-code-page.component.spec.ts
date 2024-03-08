import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSmsCodeComponent } from './enter-sms-code-page.component';

describe('EnterSmsCodeComponent', () => {
  let component: EnterSmsCodeComponent;
  let fixture: ComponentFixture<EnterSmsCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterSmsCodeComponent]
    });
    fixture = TestBed.createComponent(EnterSmsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
