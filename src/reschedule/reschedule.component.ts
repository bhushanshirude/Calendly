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
  private userId: string;
  private userData;
  private invitationData;
  // public myModel = ''
  public mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/,];
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false,
  }
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activatedRoute.params.subscribe(param => {
      this.userId = param['_id'];
    })
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() {
    this.HttpService.post("meeting/find", { "userId": this.userData[0]._id }).subscribe(
      resp => {
        this.invitationData = resp.docs[0].MeetingDetails;
      }, err => {
        console.log("===error====", err)
      })
  }
  confirms(form: any, event: Event) {
    event.preventDefault()
    if (form.valid) {
      let inviData = {
        InvitationDetails: form.value,
      }
      this.HttpService.put("invitation/" + this.userId, inviData).subscribe(
        res => {
          console.log("=======updateinvi======", inviData)
          swal("Reschedule", "Time & Data", "success");
          
          this.router.navigate(['home/messagecancel'])
          console.log("=======Resp====", res)
        }, err => {
          swal("call", "data", "error");
        });
    }
  }
}

