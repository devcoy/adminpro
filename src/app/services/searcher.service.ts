import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

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


  private transformUser( results: any[]): Usuario[] {

    return results.map(
      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }


  search( type: 'usuarios'|'medicos'|'hospitales', term: string) {

    const url = `${  BASE_URL}/todo/coleccion/${ type }/${ term }`;

    return this.http.get<any[]>( url, this.headers )
      .pipe(
        map( (resp: any) => {
          // resp.resultados
          switch (type) {
            case 'usuarios':
              return this.transformUser( resp.resultados );

              break;

            default:
              return [];
          }
        })
      );
  }


}
