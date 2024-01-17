import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddFundsComponent } from './new-add-funds.component';

describe('NewAddFundsComponent', () => {
  let component: NewAddFundsComponent;
  let fixture: ComponentFixture<NewAddFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAddFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
