import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  accessToken = localStorage.getItem('userToken');

  options = {
    headers: new HttpHeaders({
      'x-access-token': this.accessToken,
      'Content-Type': 'application/json',
      'accept': 'application/json'
    })
  }

  constructor(private http: HttpServiceService ) { }

  
  register(data : any){
    return this.http.post('registration',data,'')
  }
  
  login(data : any){
    return this.http.post('login',data,'')
  }
}
