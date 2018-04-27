import { Component, OnInit } from '@angular/core';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';


@Component({
  selector: 'app-meetingschedule',
  templateUrl: './meetingschedule.component.html',
  styleUrls: ['./meetingschedule.component.css']
})
export class MeetingscheduleComponent implements OnInit {
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  constructor(private atp: AmazingTimePickerService, ) { }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() {
  }

}
