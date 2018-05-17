import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  private MId;
  constructor(private HttpService: httpService, private router: Router ,private activateRoute:ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activateRoute.params.subscribe(param =>{
      this.MId=param['id'];
    })

  }

  ngOnInit() {
    this.HttpService.post("meeting/find", { "_id": this.MId }).subscribe(
      resp => {
        // this.meetingData=resp.docs;  // This is for all array to take data
        this.meetingData = resp.docs['0'];
      }, err => {
        console.log("=========MeetingData====", err)
      });

    this.HttpService.post("user/find", { "_id": this.userData._id }).subscribe(
      resp => {
        this.Data =resp.docs['0'].personalDetails;
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
      "UserId": this.userData._id,
      "MId":this.meetingData._id,
      "UData":this.Data,
      "Mdata": this.meetingData 
    }
    this.HttpService.post("invitation", inviData).subscribe(
      resp => {
        swal("Thanks", "Schedule Mail Has Been Send", "success")
        this.router.navigate(['home/event']);
      }, err => {
        console.log("=========Error=========", err)
      });
    form.resetForm();

    return true;
  }

}
