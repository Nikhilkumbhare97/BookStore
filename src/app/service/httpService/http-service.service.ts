import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  post(url:any,data:any,token : any){
    return this.httpClient.post(this.baseUrl+url,data,token);
  }

  get(url:any,token:any){
    return this.httpClient.get(this.baseUrl+url,token);
  }
}
