import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    providers: [httpService],
})
export class PasswordComponent implements OnInit {
    private userData;
    constructor(private HttpService: httpService, private router: Router) {
        this.userData = JSON.parse(localStorage.getItem("user"));
    }
    ngOnInit() {
    }
    update(form: any, event: Event) {   
        event.preventDefault()
        if (form.valid) {
            let onData ={
                personalDetails:form.value
            }
            this.HttpService.put("user/Email/" + this.userData._id, onData).subscribe(resp => {
                swal("successfully ", "Update Password", "success");
                // this.router.navigate(['/home/login']);
            }, err => {
                swal("Error", "Please Update the field", "error")
            });
            localStorage.clear();
            this.router.navigate(['/home/login'])
        }
    }
}
