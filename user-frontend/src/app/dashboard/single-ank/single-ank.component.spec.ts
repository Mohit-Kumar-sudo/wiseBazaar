import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnkComponent } from './single-ank.component';

describe('SingleAnkComponent', () => {
  let component: SingleAnkComponent;
  let fixture: ComponentFixture<SingleAnkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAnkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
