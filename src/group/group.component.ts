import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private userData;
  private meetingData;
  constructor(private HttpServices: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
  }

  next(form: any, event: Event) {
    if (form.valid) {
      let groupData = {
        MeetingDetails: form.value,
        "userId": this.userData._id,
        "groupName":'One-On-group'
      }
      this.HttpServices.post("meeting", groupData).subscribe(resp => {
        swal("Thanx", "update Meeting Time", "success");
        localStorage.setItem("meeting", JSON.stringify(resp.docs));
        this.meetingData = JSON.parse(localStorage.getItem("meeting"));
        this.router.navigate(['home/groupSchedule'])
      }, err => {
        swal("Error", "Not Update meeting ", "error")
      });
      form.resetForm();
      return true;
    }
  }
}
