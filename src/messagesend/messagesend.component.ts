import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { httpService } from '../httpservice';

@Component({
  selector: 'app-messagesend',
  templateUrl: './messagesend.component.html',
  styleUrls: ['./messagesend.component.css']
})
export class MessagesendComponent implements OnInit {
  private userData;
  private meetingData;
  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log("========UserData=======", this.userData)
  }

  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData['0'].id }).subscribe(
      resp => {
        console.log("=========MeetingData====", resp)
      }, err => {
        console.log("=========MeetingData====", err)
      });
  }

  left() {
    this.router.navigate(['home/event/meetingsch']);
  }
  schedule(form: any, event: Event) {
    let inviData = {
      InvitationDetails: form.value,
      "UserId": this.userData['0']._id
    }
    this.HttpService.post("invitation", inviData).subscribe(
      resp => {
        console.log("=======Success=========", resp)
        // localStorage.setItem
        swal("Thanks", "Schedule Mail Has Been Send", "success")
      }, err => {
        console.log("=========Error=========", err)
      });
    form.resetForm();

    return true;
  }

}
