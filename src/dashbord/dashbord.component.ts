import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
private userData;
  constructor(private HttpService:httpService, private router:Router) {
    this.userData =JSON.parse(localStorage.getItem("user"));
   }
  ngOnInit() {
  }

}
