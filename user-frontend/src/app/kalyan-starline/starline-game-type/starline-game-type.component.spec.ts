import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlineGameTypeComponent } from './starline-game-type.component';

describe('StarlineGameTypeComponent', () => {
  let component: StarlineGameTypeComponent;
  let fixture: ComponentFixture<StarlineGameTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarlineGameTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarlineGameTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
