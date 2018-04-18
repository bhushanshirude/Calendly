import { Component, OnInit } from '@angular/core';
import { httpService } from '../httpservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  providers: [httpService]
})
export class VerifyComponent implements OnInit {
  private userId: string;
    constructor(private HttpService: httpService, private router: Router, private activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(param => {
            this.userId = param['id'];
            console.log("======ID=====",this.userId)
            this.verifyUser();
        })
    }
  ngOnInit() { }

  verifyUser() {
      this.HttpService.get("user/" + this.userId)
      .subscribe(data => {
          let userData = data.docs;
          localStorage.setItem("user", JSON.stringify(userData));
          this.router.navigate(['/home/password']);
        }, err => {
            console.log("=========== Error ===========", JSON.parse(err._body));
        })
}
}
