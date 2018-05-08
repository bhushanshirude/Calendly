import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-message-send-cancel',
  templateUrl: './message-send-cancel.component.html',
  styleUrls: ['./message-send-cancel.component.css']
})
export class MessageSendCancelComponent implements OnInit {
  private userData;
  constructor(private HttpServices:httpService ,private router :Router) {
    this.userData=JSON.parse(localStorage.getItem("user"))
   }
  ngOnInit() {
  }
  schedule(){
    swal("Thanx","Resend Mails","success")
    this.HttpServices.post("invitation",this.userData).subscribe(
      resp=>{
        console.log("======response=====",resp);
      },err=>{
        console.log("======error========",err)
      })
  }
}
