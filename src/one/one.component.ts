import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from '../httpservice';
import swal from 'sweetalert2';
@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  private userData;
  private meetingData;
  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));

  }
  ngOnInit() {
  }

  next(form: any, event: Event) {
    event.preventDefault()
    if (form.valid) {
      let oneData = {
        MeetingDetails: form.value,
        "userId": this.userData._id
      }
      console.log("--------------", oneData)
      this.HttpService.post("meeting", oneData).subscribe(
        resp => {
          swal("Thanx ", "update Meeting Time", "success");
          localStorage.setItem("meeting", JSON.stringify(resp.docs));
          this.meetingData = JSON.parse(localStorage.getItem("meeting"));
          console.log("=========Success========", this.meetingData)
          this.router.navigate(['home/schedule']);
        }, err => {
          console.log("=========Error=========")
        });
      form.resetForm();
      return true;

    }
  }
  cancel() {
    this.router.navigate(["home/new"])
  }
}
