import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';

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
  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }
  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData[0]._id }).subscribe(
      resp => {
        this.meetingData = resp.docs;
      }, err => {
        console.log("-----------", err)
      });
    this.HttpService.post("invitation/find", { "UserId": this.userData[0]._id }).subscribe(
      resp => {
        this.invitationData = resp.docs;
      }, err => {
        console.log("-------------", err)
      });
  }
}
