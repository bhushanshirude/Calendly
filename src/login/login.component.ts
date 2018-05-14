import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userData;
  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
  }
  login(form: any, event: Event) {

    this.HttpService.post("user/find", form.value).subscribe(
      resp => {
        swal("Successfully Login", "Thanks for login", "success")

        localStorage.setItem("user", JSON.stringify(resp.docs[0]));

        this.userData = JSON.parse(localStorage.getItem("user"));
        this.router.navigate(['home/dash'])
      },
      err => {
        swal("Error", "Enter wrong Email or password", "error")

      });
  }
}
