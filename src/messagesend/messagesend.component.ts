import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { httpService } from '../httpservice';

@Component({
  selector: 'app-messagesend',
  templateUrl: './messagesend.component.html',
  styleUrls: ['./messagesend.component.css']
})
export class MessagesendComponent implements OnInit {

  constructor(private HttpService: httpService, private router: Router) { }

  ngOnInit() {
  }

  left() {
    this.router.navigate(['home/event/meetingsch']);
  }
  schedule(form: any, event: Event) {
    // this.HttpService.get()
    swal("Thanks", "Schedule Mail Has Been Send", "success")
  }

}
