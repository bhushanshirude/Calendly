import {Component, OnInit}from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.html'
})
export class HomeComponent implements OnInit{
    constructor(private router:Router){
    // localStorage.clear();
}
    ngOnInit(){
    }
}