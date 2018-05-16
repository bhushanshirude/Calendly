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
  public displayData: any = [];
  private showFlag: string = "";

  constructor(private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));

  }
  ngOnInit() {

    this.HttpService.post("invitation/find", { "UserId": this.userData._id }).subscribe(
      resp => {
        let invitationData = resp.docs;
        let i = 0;
        invitationData.filter((invitedData) => {
          this.displayData[i] = {
            inviteData: {},
            meetingData: {}
          };
          let mId = invitedData.MId;
          this.displayData[i].inviteData = invitedData;
          this.findMeetingData(mId, i);
          i++;
        });
        console.log("====> final Data ========", this.displayData);
      }, err => {
        console.log("-------------", err)
      });
  }


  findMeetingData(id, index) {
    this.HttpService.get("meeting/getall/" + id).subscribe((resp) => {
      this.displayData[index].meetingData = resp.data;
    })
  }
  Accept(form: any, event: Event) {
    swal("Thanks", "Accept Meeting Schedule", "success");
    // let canData = {
    //   "userId": this.userData._id,
    //   "IData": this.invitationData,
    //   "udata": this.Udata,
    //   "MData": this.meetingData
    // }
    // this.HttpService.post("invitation/accept", canData).subscribe(
    //   resp => {
    //     swal("Thanks", "Accept Meeting Schedule", "success");

    //   }, err => {
    //     console.log("////////////////", err)
    //   });
  }

  Cancel() {
    this.router.navigate(['/home/cancel'])

  }
  showHideMeetingDetails(_id) {
    console.log("===> We Got ====>", _id);
    if (this.showFlag != _id) {
      this.showFlag = _id;
    } else {
      this.showFlag = "";
    }
  }

}
