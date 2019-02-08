import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToSeePage } from './to-see.page';

describe('ToSeePage', () => {
  let component: ToSeePage;
  let fixture: ComponentFixture<ToSeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToSeePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
