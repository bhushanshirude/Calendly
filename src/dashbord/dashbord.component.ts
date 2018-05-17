import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
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
  Accept(invitedData, meetingData) {
    let canData = {
      "userId": this.userData,
      "Mdata": meetingData,
      "Idata": invitedData,
    }
    this.HttpService.post("invitation/accept", canData).subscribe(
      resp => {
        swal("Thanks", "Accept Meeting Schedule", "success");
      }, err => {
        console.log("-------------------", err)
      });
  }
  
  Cancel(invitedData, meetingData) {
    let canData = {
      "userId": this.userData,
      "Mdata": meetingData,
      "Idata": invitedData,
    }
    this.HttpService.post("invitation/emails", canData).subscribe(
      resp => {
        swal("Reject", "Cancel Meeting Schedule", "success");

      }, err => {
        console.log("-------------------", err)
      });
  }

  // Cancel(_id ,MId) {
  //   this.router.navigate(['/home/cancel/' + _id +'/'+ MId])

  // }

  showHideMeetingDetails(_id) {
    console.log("===> We Got ====>", _id);
    if (this.showFlag != _id) {
      this.showFlag = _id;
    } else {
      this.showFlag = "";
    }
  }

}
