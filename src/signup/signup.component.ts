import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private HttpService: httpService, private router: Router) { }
  
  ngOnInit() { }
  signup(form: any, event: Event) {
    event.preventDefault()
    if (form.valid) {
      let signupData = {
        personalDetails: form.value
      }
      
      this.HttpService.post("user",signupData).subscribe(
        resp => {
          swal("Thanks For Register", "Email Has been Send...", "success");
        }, err => {
          console.log("=========== Error =========", JSON.parse(err._body));
        });
        form.resetForm();

        return true;
    }
    swal("Error!", "Please fill out all the required fields...", "error");
  }
}
