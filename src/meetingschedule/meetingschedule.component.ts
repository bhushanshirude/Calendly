import { Component, OnInit } from '@angular/core';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';
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
  private meetingData;
  private MId;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  constructor(private atp: AmazingTimePickerService, private HttpService: httpService, private router: Router ,private activatedRoute:ActivatedRoute) {
    this.userData = JSON.parse(localStorage.getItem("user"));
    activatedRoute.params.subscribe(param => {
      this.MId = param['id']; 
    })
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  ngOnInit() { 
    this.HttpService.post("meeting/find",{"userId":this.userData._id}).subscribe(
      resp=>{
        this.meetingData =resp.docs[0].MeetingDetails;
        console.log("=====data=========",this.meetingData)
      },
      err=>{
        console.log("=======error=====",err)
      });
  }
  confirm(form: any, event: Event) {
    event.preventDefault()
    if (form.valid) {
      let onData = {
        MeetingDetails: form.value
      }
      this.HttpService.put("meetings/" + this.MId, onData).subscribe(
        resp => {
          swal("Thanx", "Please Update time & Data", "success")
          this.router.navigate(['home/message/'+ this.MId]);
        }, err => {
          swal("Error", "Please Update time & Data", "error")
        });
      form.resetForm();
      return true;
    }
  }
}
