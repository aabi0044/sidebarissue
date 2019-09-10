import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryPage } from './lottery.page';

describe('LotteryPage', () => {
  let component: LotteryPage;
  let fixture: ComponentFixture<LotteryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
