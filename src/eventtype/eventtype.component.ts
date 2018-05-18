import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from '../httpservice';

@Component({
  selector: 'app-eventtype',
  templateUrl: './eventtype.component.html',
  styleUrls: ['./eventtype.component.css']
})
export class EventtypeComponent implements OnInit {
  private userData;
  private meetingData;
  constructor(private router: Router, private HttpServices: httpService) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }
  ngOnInit() {
    this.HttpServices.post("meeting/find", { "userId": this.userData._id }).subscribe(
      resp => {
        this.meetingData = resp.docs;
      }, err => {
        console.log("======Dipak======", err)
      });
  }

  event() {
    this.router.navigate(['/home/new'])
  }
  
  Delete(index) {
    this.HttpServices.delete("meeting/" + this.meetingData[index]._id)
      .subscribe(response => {
        console.log("====> Response <=====", response);
        this.meetingData.splice(index, 1);
        // this.meetingData.post("invitation/find", {"MId":this.meetingData[index]._id}).subscribe(
        //   response=>{
        //   this.meetingData.splice(index, 1);
        // },err=>{
        //   console.log("====> Error Deleting Meeting Data <======", err);
        // });
      }, err => {
        console.log("====> Error Deleting Meeting Data <======", err);
      });
  }
}
