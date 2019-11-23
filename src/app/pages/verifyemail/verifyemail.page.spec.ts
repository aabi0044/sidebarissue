import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyemailPage } from './verifyemail.page';

describe('VerifyemailPage', () => {
  let component: VerifyemailPage;
  let fixture: ComponentFixture<VerifyemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyemailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
