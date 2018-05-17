import { ModuleWithProviders } from '@angular/core';
import {CanActivate ,CanActivateChild } from '@angular/router';
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
import {AuthGuardService as AuthGuard } from '../auth-GuardService';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  
    { path: 'home', component: HomeComponent,
        children: [
            {path:'sign',component:SignupComponent},
            {path:'login',component:LoginComponent},
            {path:'dash',component:DashbordComponent ,canActivate:[AuthGuard]},
            {path:'event',component:EventtypeComponent ,canActivate:[AuthGuard]},
            {path:'quick',component:QuickStartComponent ,canActivate:[AuthGuard]},
            {path:'password',component:PasswordComponent ,canActivate:[AuthGuard]},
            {path:'verify/:id',component:VerifyComponent }, 
            {path:'new',component:NewComponent ,canActivate:[AuthGuard]} ,
            {path:'one',component:OneComponent ,canActivate:[AuthGuard]},
            {path:'group',component:GroupComponent ,canActivate:[AuthGuard]},
            {path:'schedule',component:ScheduleComponent ,canActivate:[AuthGuard]},
            {path:'event/meetingsch/:id',component:MeetingscheduleComponent ,canActivate:[AuthGuard]},
            {path:'groupSchedule',component:GroupscheduleComponent ,canActivate:[AuthGuard]},
            {path:'message/:id',component:MessagesendComponent ,canActivate:[AuthGuard]},
            {path:'reschedule/:_id',component:RescheduleComponent ,canActivate:[AuthGuard]},
            {path:'messagecancel/:_id',component:MessageSendCancelComponent ,canActivate:[AuthGuard]},
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);