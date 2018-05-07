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
  public mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/,];
  private userData;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    // console.log("==========Userid=========", this.userData['0']._id);
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() { }

  confirm(form: any, event: Event) {
    this.HttpService.put("user/" + this.userData['0']._id, this.userData['0']).subscribe(
      resp => {
        console.log("=======aaaaaaaaa=======", this.userData);
        console.log("======sssssss========", resp)
        swal("Thanx", "Please Update time & Data", "success")
        this.router.navigate(['home/message']);
      }, err => {
        swal("Error", "Please Update time & Data", "error")
      });
    }
    // return resetForm()
}
