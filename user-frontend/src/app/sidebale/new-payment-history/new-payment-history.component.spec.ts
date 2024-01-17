import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentHistoryComponent } from './new-payment-history.component';

describe('NewPaymentHistoryComponent', () => {
  let component: NewPaymentHistoryComponent;
  let fixture: ComponentFixture<NewPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
