import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelmeetingComponent } from './cancelmeeting.component';

describe('CancelmeetingComponent', () => {
  let component: CancelmeetingComponent;
  let fixture: ComponentFixture<CancelmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
