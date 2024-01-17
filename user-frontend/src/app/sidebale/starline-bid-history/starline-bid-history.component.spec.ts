import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlineBidHistoryComponent } from './starline-bid-history.component';

describe('StarlineBidHistoryComponent', () => {
  let component: StarlineBidHistoryComponent;
  let fixture: ComponentFixture<StarlineBidHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarlineBidHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarlineBidHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
