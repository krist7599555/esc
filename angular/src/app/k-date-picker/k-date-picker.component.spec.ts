import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KDatePickerComponent } from './k-date-picker.component';

describe('KDatePickerComponent', () => {
  let component: KDatePickerComponent;
  let fixture: ComponentFixture<KDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
