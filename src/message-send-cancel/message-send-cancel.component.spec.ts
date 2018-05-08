import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSendCancelComponent } from './message-send-cancel.component';

describe('MessageSendCancelComponent', () => {
  let component: MessageSendCancelComponent;
  let fixture: ComponentFixture<MessageSendCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSendCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSendCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
