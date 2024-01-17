import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSangamComponent } from './full-sangam.component';

describe('FullSangamComponent', () => {
  let component: FullSangamComponent;
  let fixture: ComponentFixture<FullSangamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullSangamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSangamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
