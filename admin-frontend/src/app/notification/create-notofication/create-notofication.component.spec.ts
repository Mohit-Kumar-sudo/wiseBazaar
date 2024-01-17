import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotoficationComponent } from './create-notofication.component';

describe('CreateNotoficationComponent', () => {
  let component: CreateNotoficationComponent;
  let fixture: ComponentFixture<CreateNotoficationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotoficationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotoficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
