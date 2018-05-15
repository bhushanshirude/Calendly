import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  private userData;
  private meetingData;
  private invitationData;
  private showFlag: string = "";
  private Udata;

  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log("------++++++++",this.userData.personalDetails)
  }
  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData._id }).subscribe(
      resp => {
        this.meetingData = resp.docs;
      }, err => {
        console.log("-----------", err)
      });
    this.HttpService.post("invitation/find", { "UserId": this.userData._id }).subscribe(
      resp => {
        this.invitationData = resp.docs;
      }, err => {
        console.log("-------------", err)
      });
      this.HttpService.post("user/find",{"_id":this.userData._id}).subscribe(resp=>{
        this.Udata =resp.docs['0'].personalDetails.Date;
      },err=>{
        console.log("------------",err)
      });
  }

  Accept(){
   
    swal("Thanks","Accepet Meeting Schedule","success")
    this.router.navigate(['/home/event/meetingsch'])
  }

  Cancel(){
    this.router.navigate(['/home/cancel'])

  }
}
