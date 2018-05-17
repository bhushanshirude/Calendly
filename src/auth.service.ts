import { Injectable } from '@angular/core';

Injectable()

export class AuthService {
    public FirstName: String;
    constructor() {
        this.FirstName = JSON.parse(localStorage.getItem("user"));
    }
    public isAuthenticated(): boolean {
        this.FirstName = JSON.parse(localStorage.getItem("user"));
        if (!this.FirstName) {
            return false;
        }
        return true;
    }
}