import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

    signup(data:any): Observable<any>{
     return this.http.post('http://localhost:4000/register', data, {
      observe: 'response',
      responseType: 'json'
     })
    }



    login(data:any):Observable<any>{
     return this.http.post('http://localhost:4000/login', data)
    }


    logout(){
      localStorage.removeItem("token")
    }

}
