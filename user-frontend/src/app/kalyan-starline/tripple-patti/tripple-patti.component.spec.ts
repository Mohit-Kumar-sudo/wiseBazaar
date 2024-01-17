import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripplePattiComponent } from './tripple-patti.component';

describe('TripplePattiComponent', () => {
  let component: TripplePattiComponent;
  let fixture: ComponentFixture<TripplePattiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripplePattiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripplePattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
