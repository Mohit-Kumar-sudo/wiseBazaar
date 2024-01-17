import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWebComponent } from './payment-web.component';

describe('PaymentWebComponent', () => {
  let component: PaymentWebComponent;
  let fixture: ComponentFixture<PaymentWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
