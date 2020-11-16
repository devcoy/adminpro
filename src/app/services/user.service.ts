import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

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

    return this.http.post( `${ BASE_URL }/usuarios`, formData );


  }
}
