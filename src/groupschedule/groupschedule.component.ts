import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-groupschedule',
  templateUrl: './groupschedule.component.html',
  styleUrls: ['./groupschedule.component.css']
})
export class GroupscheduleComponent implements OnInit {
  private meetingData;

  constructor(private HttpService: httpService, private router: Router) {
    this.meetingData = JSON.parse(localStorage.getItem("meeting"));
  }
  ngOnInit() {
  }
  close() {
    this.HttpService.put("meeting/" + this.meetingData._id, this.meetingData).subscribe(
      resp => {
        swal("Thanx","Group Meeting schedule Update","success")
        this.router.navigate(['home/event'])
       },
      err => { 
        swal("Error","Group Meeting schedule Update","error")
      });
  }
}
