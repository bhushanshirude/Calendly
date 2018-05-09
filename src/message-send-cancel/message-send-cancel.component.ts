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
  constructor(private HttpServices: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"))
  }
  ngOnInit() {
    this.HttpServices.post("invitation/find", { "UserId": this.userData['0']._id }).subscribe(
      resp => {
        this.invitationData = resp.docs[0].InvitationDetails;
        console.log("==== My Data ====", this.invitationData.IName);
      }, err => {
        console.log("======Vivek======", err)
      });

      this.HttpServices.post("meeting/find",{"userId":this.userData['0']._id}).subscribe(
        resp=>{
          console.log("=====success====",resp)
        },
        err=>{
          console.log("====Error====",err)
        }
      )
  }


  schedule(form: any, event: Event) {
    let userData = {
      email: this.userData['0'].personalDetails.Email,
      firstname: this.userData['0'].personalDetails.FirstName,
      lastname: this.userData['0'].personalDetails.LastName,
      userId: this.userData['0']._id,
      IName: this.invitationData.IName,
      IDate:this.invitationData.IDate,
      ITime:this.invitationData.ITime,
      ISelect:this.invitationData.ISelect
    }

    this.HttpServices.post("invitation/email ", userData).subscribe(
      resp => {
        swal("Thanx", "Reschulde Meeting Mail has been Send", "success")
        // this.router.navigate(['home/event']);
      }, err => {
        console.log("======error========", err)
        swal("Error", "Reschdule mail has Not Been send", "error")
      });
    form.resetForm();
    return true;
  }
}
