import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupscheduleComponent } from './groupschedule.component';

describe('GroupscheduleComponent', () => {
  let component: GroupscheduleComponent;
  let fixture: ComponentFixture<GroupscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
