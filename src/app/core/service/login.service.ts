import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * 
   * @param http Http Client to send requests.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param login 
   */
  login(login: any): Observable<any> {

    return this.http.post(`${environment.base_url}/auth/login`, login);
  }
}
