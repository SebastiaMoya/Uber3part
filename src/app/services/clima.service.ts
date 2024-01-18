import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  
  apiurl = "https://api.weatherapi.com/v1/current.json?key=d098dbd03632419a9f3201430230811&q=santiago&aqi=no";
  
  constructor(private http:HttpClient) { }

  getclima():Observable<any>{
    return this.http.get(this.apiurl).pipe(
      retry(3)
    );
  }
}


//http://api.weatherapi.com/v1/current.json?key=d098dbd03632419a9f3201430230811&q=Santiago&aqi=no