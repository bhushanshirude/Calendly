import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpService } from '../httpservice';
import swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  private meetingData;
  constructor(private router: Router, private HttpService: httpService) {
    this.meetingData = JSON.parse(localStorage.getItem("meeting"));
  }

  ngOnInit() {
  }
  save() {
    this.HttpService.put("meeting/" + this.meetingData._id, this.meetingData).subscribe(
      resp => {
        console.log("===========HttpServices============", )
        swal("Thanx ", "Meeting Schedule Update", "success");
        this.router.navigate(['home/dash'])
      },
      err => {
        swal("Error", "Meeting Schedule Not Update", "error")
      })

  }
}