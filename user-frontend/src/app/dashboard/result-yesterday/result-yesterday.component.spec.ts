import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultYesterdayComponent } from './result-yesterday.component';

describe('ResultYesterdayComponent', () => {
  let component: ResultYesterdayComponent;
  let fixture: ComponentFixture<ResultYesterdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultYesterdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultYesterdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
