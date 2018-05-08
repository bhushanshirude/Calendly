import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask/dist/angular2TextMask';
import { routing } from './routing'
import { NgModule } from '@angular/core';
import { httpService } from '../httpservice';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home';
import { DashbordComponent } from '../dashbord/dashbord.component';
import { EventtypeComponent } from '../eventtype/eventtype.component';
import { QuickStartComponent } from '../quick-start/quick-start.component';
import { PasswordComponent } from '../password/password.component';
import { VerifyComponent } from '../verify/verify.component';
import { NewComponent } from '../new/new.component';
import { OneComponent } from '../one/one.component';
import { GroupComponent } from '../group/group.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MeetingscheduleComponent } from '../meetingschedule/meetingschedule.component';
import { GroupscheduleComponent } from '../groupschedule/groupschedule.component';
import { MessagesendComponent } from '../messagesend/messagesend.component';
import { RescheduleComponent } from '../reschedule/reschedule.component';
import { MessageSendCancelComponent } from '../message-send-cancel/message-send-cancel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashbordComponent,
    EventtypeComponent,
    QuickStartComponent,
    PasswordComponent,
    VerifyComponent,
    NewComponent,
    OneComponent,
    GroupComponent,
    ScheduleComponent,
    MeetingscheduleComponent,
    GroupscheduleComponent,
    MessagesendComponent,
    RescheduleComponent,
    MessageSendCancelComponent,
    

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    AngularDateTimePickerModule,
    AmazingTimePickerModule,
    TextMaskModule
  ],
  providers: [httpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
