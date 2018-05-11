import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private userData: any = 0;
  constructor(private Httpservice: httpService, private router: Router, private cdr: ChangeDetectorRef) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log("============This page is app Component===========", this.userData['0'].personalDetails.FirstName)
   
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("=======personalDetails========", this.userData)
    this.router.events
      .subscribe(resp => {
        this.userData = localStorage.getItem("user");
        if (this.userData) {
          this.userData = JSON.parse(this.userData);
          return true;
        }
        this.userData != 0;
        return false;
      })
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['home'])
  }

}
