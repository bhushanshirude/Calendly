import { Component, OnInit } from '@angular/core';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask/dist/angular2TextMask';
import swal from 'sweetalert2';

@Component({
  selector: 'app-meetingschedule',
  templateUrl: './meetingschedule.component.html',
  styleUrls: ['./meetingschedule.component.css']
})
export class MeetingscheduleComponent implements OnInit {
  public myModel = ''
  public mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/,];
  private userData;
  private meetingData;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    console.log("==========UserData=========", this.userData['0']._id);
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() {}
  confirm() {
    swal("Thanx","Please Update time & Data","success")
   this.router.navigate(['home/message']);
  }
}
