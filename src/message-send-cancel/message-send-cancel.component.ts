import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-message-send-cancel',
  templateUrl: './message-send-cancel.component.html',
  styleUrls: ['./message-send-cancel.component.css']
})
export class MessageSendCancelComponent implements OnInit {
  private userData;
  private invitationData;
  private meetingdata;
  private UData;
  private id;
  constructor(private HttpServices: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"))
    activatedRoute.params.subscribe(param => {
      this.id = param["_id"]
    })
  }
  ngOnInit() {
    this.HttpServices.post("invitation/find", { "_id": this.id }).subscribe(
      resp => {
        this.invitationData = resp.docs[0].InvitationDetails;
      }, err => {
        console.log("======Error======", err)
      });

    this.HttpServices.post("meeting/find", { "userId": this.userData._id }).subscribe(
      resp => {
        this.meetingdata = resp.docs[0].MeetingDetails
      },
      err => {
        console.log("====Error====", err)
      });

    this.HttpServices.post("user/find", { "_id": this.userData._id }).subscribe(
      resp => {
        this.UData = resp.docs[0].personalDetails
      }, err => {
        console.log("----------", err)
      });
  }


  reschedule(form: any, event: Event) {
    let userData = {
      InvitationDetails: form.value,
      "userId": this.userData._id,
      "IData": this.invitationData,
      "udata": this.UData,
      "MData": this.meetingdata,
      "id":this.id
    }
    this.HttpServices.post("invitation/email ", userData).subscribe(
      resp => {
        swal("Thanx", "Reschulde Meeting Mail has been Send", "success")
        this.router.navigate(['/home/event']);
        this.HttpServices.post("invitation/" + this.id, userData).subscribe(
          resp => {
            console.log("----------", resp);
          }, err => {
            console.log("----------", err)
          });
      }, err => {
        console.log("======error========", err)
        swal("Error", "Reschdule mail has Not Been send", "error")
      });
    form.resetForm();
    return true;
  }
}
