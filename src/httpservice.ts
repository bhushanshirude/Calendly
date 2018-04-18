import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class httpService {

    public API_URL: String = "http://localhost:8080/";

    constructor(private http: Http) { }

    get(url) {
        return this.http.get(this.API_URL + url).map(response => response.json());
    }

    post(url, data) {
        return this.http.post(this.API_URL + url, data)
            .map(response => response.json());
    }
    put(url, data) {
        return this.http.put(this.API_URL + url, data)
            .map(response => response.json());
    }
    setLocalStorage(name, value) {
        localStorage.setItem(name, value);
    }
    getLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name));
    }
}