import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospitals.model';
import { Doctor } from '../models/doctor.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

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


  private transformUser(results: any[]): Usuario[] {
    return results.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }



  private transformHospital(results: any[]): Hospital[] {
    return results;
  }



  private transformDoctor(results: any[]): Doctor[] {
    return results;
  }




  search(type: 'usuarios' | 'medicos' | 'hospitales', term: string) {

    const url = `${BASE_URL}/todo/coleccion/${type}/${term}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          // resp.resultados
          switch (type) {
            case 'usuarios':
              return this.transformUser(resp.resultados);
              break;

            case 'hospitales':
              return this.transformHospital(resp.resultados);
              break;

            case 'medicos':
              return this.transformHospital(resp.resultados);
              break;

            default:
              return [];
          }
        })
      );
  }





  delteUser(user: Usuario) {

    console.log('eliminando...');

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${user.uid}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


}
