import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
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
import { CancelmeetingComponent } from '../cancelmeeting/cancelmeeting.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  
    { path: 'home', component: HomeComponent,
        children: [
            {path:'sign',component:SignupComponent},
            {path:'login',component:LoginComponent},
            {path:'dash',component:DashbordComponent},
            {path:'event',component:EventtypeComponent},
            {path:'quick',component:QuickStartComponent},
            {path:'password',component:PasswordComponent},
            {path:'verify/:id',component:VerifyComponent}, 
            {path:'new',component:NewComponent} ,
            {path:'one',component:OneComponent},
            {path:'group',component:GroupComponent},
            {path:'schedule',component:ScheduleComponent},
            {path:'event/meetingsch',component:MeetingscheduleComponent},
            {path:'groupSchedule',component:GroupscheduleComponent},
            {path:'message',component:MessagesendComponent},
            {path:'reschedule/:_id',component:RescheduleComponent},
            {path:'messagecancel/:_id',component:MessageSendCancelComponent},
            {path:'cancel',component:CancelmeetingComponent}
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);