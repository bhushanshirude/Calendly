import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelmeeting',
  templateUrl: './cancelmeeting.component.html',
  styleUrls: ['./cancelmeeting.component.css']
})
export class CancelmeetingComponent implements OnInit {
private invitationData;
private meetingdata;
private UData;
private userData;

  constructor(private HttpServices:httpService ,private router:Router) {
    this.userData =JSON.parse(localStorage.getItem("user"));

   }

  ngOnInit() {
    this.HttpServices.post("invitation/find", { "_id": this.userData.id }).subscribe(
      resp => {
        this.invitationData = resp.docs['0'];
      }, err => {
        console.log("======Error======", err)
      });

      this.HttpServices.post("meeting/find",{"userId":this.userData._id}).subscribe(
        resp=>{
          this.meetingdata =resp.docs[0].MeetingDetails
        },
        err=>{
          console.log("====Error====",err)
        });

        this.HttpServices.post("user/find",{"_id":this.userData._id}).subscribe(
          resp=>{
            this.UData=resp.docs[0].personalDetails
        },err=>{
          console.log("----------",err)
        });
  }
  Cancel(form:any , event:Event){
    let canData ={
      invitationData:form.value,
      "userId": this.userData._id,
      "IData":this.invitationData.InvitationDetails,
      "udata":this.UData,
      "MData":this.meetingdata
    }
    this.HttpServices.post("invitation/emails",canData).subscribe(
      resp=>{
        console.log("----------------sssssssss------------",resp)
      },err=>{
        console.log("---------------------sssssssssssss--------",err)
      });
  }

}
