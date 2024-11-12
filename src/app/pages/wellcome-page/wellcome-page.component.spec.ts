import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomePageComponent } from './wellcome-page.component';

describe('WellcomePageComponent', () => {
  let component: WellcomePageComponent;
  let fixture: ComponentFixture<WellcomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellcomePageComponent]
    });
    fixture = TestBed.createComponent(WellcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
