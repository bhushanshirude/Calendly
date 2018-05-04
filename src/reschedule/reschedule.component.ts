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
  public myModel = ''
  public mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/,];
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activatedRoute.params.subscribe(param => {
      this.userId = param['_id'];
      console.log("=========res========", this.userId);
    })
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() {
  }
  confirms() {
    console.log("===========1234567========", this.userId);
  }
}


