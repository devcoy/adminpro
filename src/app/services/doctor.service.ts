import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs/operators';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }




  loadDoctors() {

    const url = `${BASE_URL}/medicos`;

    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: { ok: boolean, medicos: Doctor[]}) => resp.medicos )
      );
  }




  deleteDoctor( _id: string ) {

    const url = `${BASE_URL}/medicos/${ _id }`;

    return this.http.delete(url, this.headers);
  }
}
