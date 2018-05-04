import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  private userId: string;
  constructor(private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => {
      this.userId = param['_id'];
      console.log("=========res========", this.userId);
      this.reschedule()
    })
  }
  ngOnInit() {
  }
  reschedule() {
      this.router.navigate(['/home/event/meetingsch']);
  }
}
