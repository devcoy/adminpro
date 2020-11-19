import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }




  async updatePhoto( file: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string ) {

    try {

      const url = `${ BASE_URL }/upload/${ tipo }/${ id }`;
      const formData = new FormData();

      formData.append('img', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      } );

      const data = await resp.json();

      if( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data);
        return false;
      }


    } catch (error) {

      console.log('Error al subir el archivo');
      console.log(error);
      return false;

    }

  }



}
