import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const gapi: any;
const BASE_URL = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;


  constructor(

    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }


  googleInit() {

    return new Promise( resolve => {

      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id: '854454108413-v9jce5b17md35enuvo3840fva977jqve.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    });
  }




  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${BASE_URL}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false)) // atrapamos el error, es decir, si no es true, retornará un false
    );

  }


  createUser(formData: RegisterForm): Observable<any> {

    return this.http.post(`${BASE_URL}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }



  login(formData: LoginForm): Observable<any> {

    return this.http.post(`${BASE_URL}/auth`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }




  loginGoogle(token: string): Observable<any> {

    return this.http.post(`${BASE_URL}/auth/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }



  logout() {

    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');
      });
    });

  }

}
