import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeRulesComponent } from './notice-rules.component';

describe('NoticeRulesComponent', () => {
  let component: NoticeRulesComponent;
  let fixture: ComponentFixture<NoticeRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
