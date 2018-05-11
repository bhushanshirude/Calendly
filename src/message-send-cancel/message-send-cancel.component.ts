import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
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
  constructor(private HttpServices: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"))
  }
  ngOnInit() {
    this.HttpServices.post("invitation/find", { "UserId": this.userData['0']._id }).subscribe(
      resp => {
        this.invitationData = resp.docs[0].InvitationDetails;
      }, err => {
        console.log("======Error======", err)
      });

      this.HttpServices.post("meeting/find",{"userId":this.userData['0']._id}).subscribe(
        resp=>{
          this.meetingdata =resp.docs[0].MeetingDetails
        },
        err=>{
          console.log("====Error====",err)
        });

        this.HttpServices.post("user/find",{"_id":this.userData[0]._id}).subscribe(
          resp=>{
            this.UData=resp.docs[0].personalDetails
        },err=>{
          console.log("----------",err)
        });
  }


  reschedule(form: any, event: Event) {
    let userData = {
      InvitationDetails:form.value,
      "userId": this.userData['0']._id,
      "IData":this.invitationData,
      "udata":this.UData,
      "MData":this.meetingdata
    }
    this.HttpServices.post("invitation/email ", userData).subscribe(
      resp => {
        swal("Thanx", "Reschulde Meeting Mail has been Send", "success")
        this.router.navigate(['/home/event']);
      }, err => {
        console.log("======error========", err)
        swal("Error", "Reschdule mail has Not Been send", "error")
      });
    form.resetForm();
    return true;
  }
}
