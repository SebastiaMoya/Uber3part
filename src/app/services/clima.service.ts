import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  
  apiKey = "5567e80d7750c20b518461c7273e8461";
  
  constructor(private http:HttpClient) { }
    
  getclima(city: string){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={this.apiKey}');

}
}