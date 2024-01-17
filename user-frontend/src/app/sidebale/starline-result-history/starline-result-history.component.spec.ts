import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlineResultHistoryComponent } from './starline-result-history.component';

describe('StarlineResultHistoryComponent', () => {
  let component: StarlineResultHistoryComponent;
  let fixture: ComponentFixture<StarlineResultHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarlineResultHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarlineResultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
