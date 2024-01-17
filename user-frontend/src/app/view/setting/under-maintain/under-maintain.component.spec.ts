import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMaintainComponent } from './under-maintain.component';

describe('UnderMaintainComponent', () => {
  let component: UnderMaintainComponent;
  let fixture: ComponentFixture<UnderMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
