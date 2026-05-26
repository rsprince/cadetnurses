import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  url = '/data/content.json';
  data: any;

  constructor(private http: HttpClient) {}

  getPeople() {
    this.data = this.http.get(this.url);
    console.log("Firing Service");
    return this.data;
  }
}
