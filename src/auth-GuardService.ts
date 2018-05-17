import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import { CanActivate, Router } from '@angular/router';


@Injectable()

export class AuthGuardService implements CanActivate{
    constructor(private Auth :AuthService , private router:Router){}

    canActivate():boolean{
        if(!this.Auth.isAuthenticated()){
            this.router.navigateByUrl('home/login')
            return false;
        }
        return true;
    }
}