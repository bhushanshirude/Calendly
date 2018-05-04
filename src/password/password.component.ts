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
        console.log("=========password========",this.userData)
    }
    ngOnInit() {
    }
    update(form: any, event: Event) {   

        if (form.valid) {
            this.HttpService.put("user/" + this.userData._id, this.userData).subscribe(resp => {
                swal("successfully ", "Update Password", "success");
                this.router.navigate(['/home/login']);
            }, err => {
                swal("Error", "Please Update the field", "error")
            });
            form.resetForm();
            return true;
        }
    }

}
