import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { TextMaskModule } from 'angular2-text-mask/dist/angular2TextMask';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  private InId: string;
  private userData;
  private meetingdata;
  private invitationData;
  public mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/,];
  
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activatedRoute.params.subscribe(param => {
      this.InId = param['_id'];
    })
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData._id }).subscribe(
      resp => {
        this.meetingdata = resp.docs[0].MeetingDetails;
      }, err => {
        console.log("===error====", err)
      });

    this.HttpService.post("invitation/find", { "_id": this.InId }).subscribe(
      resp => {
        this.invitationData = resp.docs[0].InvitationDetails;
      }, err => {
        console.log("=====Error======", err)
      });
  }
  confirms(form: any, event: Event) {
    event.preventDefault()
    if (form.valid) {
      let inviData = {
        InvitationDetails: form.value,
      }
      this.HttpService.put("invitation/" + this.InId, inviData).subscribe(
        res => {
          swal("Reschedule", "Time & Data", "success");
          this.router.navigate(['home/messagecancel/' + this.InId])
          console.log("=======Resp====", res)
        }, err => {
          swal("call", "data", "error");
        });
    }
  }
}

