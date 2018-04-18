import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [httpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
