import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';

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




  createDoctor( doctor:Doctor ) {

    const url = `${BASE_URL}/medicos`;

    // const payload = {
    //   nombre: doctor.nombre,
    //   hospital: 'ABC'
    // };

    return this.http.post(url, doctor, this.headers);
  }




  updateHospital( doctor: Doctor ) {

    const url = `${BASE_URL}/medicos/${ doctor._id }`;

    return this.http.put(url, doctor, this.headers);
  }




  deleteDoctor( _id: string ) {

    const url = `${BASE_URL}/medicos/${ _id }`;

    return this.http.delete(url, this.headers);
  }
}
