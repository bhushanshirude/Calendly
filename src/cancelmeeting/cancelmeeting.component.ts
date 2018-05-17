import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cancelmeeting',
  templateUrl: './cancelmeeting.component.html',
  styleUrls: ['./cancelmeeting.component.css']
})
export class CancelmeetingComponent implements OnInit {
  private invitationData;
  private meetingdata;
  private userData;
  private ID;
  private MId;

  constructor(private HttpServices: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activatedRoute.params.subscribe(param => {
      this.ID = param['_id'];
    }),
    activatedRoute.params.subscribe(param=>{
      this.MId =param['_MId']
    })
  

  }

  ngOnInit() {
    this.HttpServices.post("invitation/find", { "_id": this.ID }).subscribe(
      resp => {
        this.invitationData = resp.docs['0'];
      }, err => {
        console.log("======Error======", err)
      });

    this.HttpServices.post("meeting/find", { "_id": this.MId }).subscribe(
      resp => {
        this.meetingdata = resp.docs[0].MeetingDetails
      },
      err => {
        console.log("====Error====", err)
      });
  }
  Cancel(form: any, event: Event) {
    let canData = {
      invitationData: form.value,
      // "userId": this.userData._id,
      "IData": this.invitationData.InvitationDetails,
      "MData": this.meetingdata,
      "udata":this.userData,
    }
    console.log("******************",canData)
    this.HttpServices.post("invitation/emails", canData).subscribe(
      resp => {
        swal("Meeting Schedule", "Has been Cancel", "success");
        this.router.navigate(['home/dash'])
      }, err => {
        console.log("---------------sssssssssssss--------", err)
      });
  }

}
