import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidGameHistoryComponent } from './bid-game-history.component';

describe('BidGameHistoryComponent', () => {
  let component: BidGameHistoryComponent;
  let fixture: ComponentFixture<BidGameHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidGameHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidGameHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
