import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospitals } from '../models/hospitals.model';

const BASE_URL = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


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



  loadHospitals() {

    const url = `${BASE_URL}/hospitales`;

    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: { ok: boolean, hospitales: Hospitals[]}) => resp.hospitales )
      );
  }

}
