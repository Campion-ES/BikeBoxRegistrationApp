import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdPageComponent } from './verify-id-page.component';

describe('VerifyIdPageComponent', () => {
  let component: VerifyIdPageComponent;
  let fixture: ComponentFixture<VerifyIdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyIdPageComponent]
    });
    fixture = TestBed.createComponent(VerifyIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
