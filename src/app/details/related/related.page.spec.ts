import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPage } from './related.page';

describe('RelatedPage', () => {
  let component: RelatedPage;
  let fixture: ComponentFixture<RelatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
