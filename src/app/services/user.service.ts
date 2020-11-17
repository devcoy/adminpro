import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const BASE_URL = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(

    private http: HttpClient

  ) { }


  createUser( formData: RegisterForm ): Observable<any> {

    // console.log('Creando usuario');

    return this.http.post( `${ BASE_URL }/usuarios`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }



  login( formData: LoginForm ): Observable<any> {

    return this.http.post( `${ BASE_URL }/auth`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }


  loginGoogle( token: string ): Observable<any> {

    return this.http.post( `${ BASE_URL }/auth/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

}
