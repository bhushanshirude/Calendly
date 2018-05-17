import { Injectable } from '@angular/core';

Injectable()

export class AuthService {
    public userData: String;
    constructor() {
        this.userData = JSON.parse(localStorage.getItem("user"));
    }
    public isAuthenticated(): boolean {
        this.userData = JSON.parse(localStorage.getItem("user"));
        if (!this.userData) {   
            return false;
        }
        return true;
    }
}