import { Component, OnInit } from '@angular/core';
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
  private userData;
  constructor(private Httpservice: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log("==========userData========", this.userData)
  }
  ngOnInit() {
  }
  logout() {

    localStorage.removeItem("user");
    localStorage.clear();
    this.router.navigate(['home'])
  }

}
