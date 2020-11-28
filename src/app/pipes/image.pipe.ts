import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'usaurios'|'medicos'|'hospitales'): string {

    if( !img) {
      return `${BASE_URL}/upload/usuarios/no-image`;

  } else if ( img.includes('https') ) {
      return img;

  } else if ( img ) {
      return `${BASE_URL}/upload/${ type }/${ img }`;

  } else {
      return `${BASE_URL}/upload/${ type }/no-image`;
  }
  }

}
