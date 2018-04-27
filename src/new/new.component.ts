import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }
  Event() {
    this.router.navigate(['/home/event']);
  }
  create(){
    this.router.navigate(['/home/one']);
  }
  Create(){
    this.router.navigate(['home/group']);
  }
}
