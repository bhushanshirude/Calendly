import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventtype',
  templateUrl: './eventtype.component.html',
  styleUrls: ['./eventtype.component.css']
})
export class EventtypeComponent implements OnInit {
private userData;
  constructor(private router :Router) { 
    this.userData=JSON.parse(localStorage.getItem("user"));
    console.log("=====Event Data =======",this.userData['0'].personalDetails.FirstName)
  }

  ngOnInit() {
  }
  event(){
   this.router.navigate(['/home/new'])
  }

}
