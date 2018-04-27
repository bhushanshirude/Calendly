import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesendComponent } from './messagesend.component';

describe('MessagesendComponent', () => {
  let component: MessagesendComponent;
  let fixture: ComponentFixture<MessagesendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
