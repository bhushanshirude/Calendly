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
  private Data;
  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData['0'].id }).subscribe(
      resp => {
        // this.meetingData=resp.docs;  // This is for all array to take data
        this.meetingData = resp.docs['0'].MeetingDetails;
      }, err => {
        console.log("=========MeetingData====", err)
      });

    this.HttpService.post("user/find", { "_id": this.userData[0]._id }).subscribe(
      resp => {
        this.Data =resp.docs[0].personalDetails;
        console.log("==========",this.Data)
      }, err => {
        console.log("=========Error======", err)
      })
  }

  left() {
    this.router.navigate(['home/event/meetingsch']);
  }
  schedule(form: any, event: Event) {
    let inviData = {
      InvitationDetails: form.value,
      "UserId": this.userData['0']._id,
      "UData":this.Data,
      "Mdata": this.meetingData 
    }
    this.HttpService.post("invitation", inviData).subscribe(
      resp => {
        console.log("=======Successkkkk=========",  resp)
        swal("Thanks", "Schedule Mail Has Been Send", "success")

      }, err => {
        console.log("=========Error=========", err)
      });
    form.resetForm();

    return true;
  }

}
