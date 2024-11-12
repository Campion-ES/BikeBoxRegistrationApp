import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorMessageComponent } from './api-error-message.component';

describe('ApiErrorMessageComponent', () => {
  let component: ApiErrorMessageComponent;
  let fixture: ComponentFixture<ApiErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiErrorMessageComponent]
    });
    fixture = TestBed.createComponent(ApiErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
