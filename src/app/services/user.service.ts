import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUser } from '../interfaces/load-users.interfaces';

import { Usuario } from '../models/usuario.model';

declare const gapi: any;
const BASE_URL = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public usuario: Usuario;



  constructor(

    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.googleInit();
  }



  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }


  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }




  saveDataInLocalStrg(token, menu) {
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'menu', JSON.stringify(menu) );
  }





  googleInit() {

    return new Promise(resolve => {

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

    return this.http.get(`${BASE_URL}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        // console.log(resp);
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        this.saveDataInLocalStrg( resp.token, resp.menu );

        return true;
      }),
      catchError(error => of(false)) // atrapamos el error, es decir, si no es true, retornará un false
    );

  }





  createUser(formData: RegisterForm): Observable<any> {

    return this.http.post(`${BASE_URL}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          this.saveDataInLocalStrg( resp.token, resp.menu );
        })
      );
  }









  updateProfile(formData: { nombre: string, email: string, role: string }): Observable<any> {

    formData = {
      ...formData,
      role: this.role
    };

    return this.http.put(`${BASE_URL}/usuarios/${this.uid}`, formData, this.headers);

  }







  login(formData: LoginForm): Observable<any> {

    return this.http.post(`${BASE_URL}/auth`, formData)
      .pipe(
        tap((resp: any) => {
          this.saveDataInLocalStrg( resp.token, resp.menu );
        })
      );
  }








  loginGoogle(token: string): Observable<any> {

    return this.http.post(`${BASE_URL}/auth/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.saveDataInLocalStrg( resp.token, resp.menu );
        })
      );
  }




  logout(): any {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');


    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');
      });
    });

  }




  loadUsers(desde) {

    const url = `${BASE_URL}/usuarios?desde=${desde}`;

    return this.http.get<LoadUser>(url, this.headers)
      .pipe(
        map(resp => {

          const users = resp.usuarios
            .map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );

          return {
            total: resp.total,
            usuarios: users
          }
        })
      );
  }





  deleteUser(uid: string): Observable<any> {

    const endPoint = `${BASE_URL}/usuarios/${uid}`;


    return this.http.delete(endPoint, this.headers);

  }


  saveUser(user: Usuario): Observable<any> {

    return this.http.put(`${BASE_URL}/usuarios/${ user.uid }`, user, this.headers);



  }

}
