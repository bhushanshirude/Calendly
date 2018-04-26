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
  private userData;
  constructor(private router: Router, private HttpService: httpService) {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
  }
  save() {
    // this.HttpService.put("user/" + this.userData['0']._id ,this.userData['0']).subscribe(
    //   resp=>{
    //   console.log("=========Success=========",resp)
    //   swal("Update","Meeting Schedule Update","success");
    // },err=>{
    //   console.log("====Error===",err)
    // })
    // this.router.navigate(['home/new'])
  }
}
