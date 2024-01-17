import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalApprovalComponent } from './withdrawal-approval.component';

describe('WithdrawalApprovalComponent', () => {
  let component: WithdrawalApprovalComponent;
  let fixture: ComponentFixture<WithdrawalApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
