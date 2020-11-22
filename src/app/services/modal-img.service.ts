import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  private _hiddenModal: boolean = true;
  type: 'usuarios'|'medicos'|'hospitales';
  id: string;
  currentImg: string;

  newImg: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }



  get hiddenModal() {
    return this._hiddenModal;
  }





  openModal( type: 'usuarios'|'medicos'|'hospitales', id: string, currentImg: string = 'no-img' ) {

    this._hiddenModal = false;

    this.type = type;
    this.id = id;


    if( currentImg.includes( 'https' ) ) {
      this.currentImg = currentImg;

    } else {
      this.currentImg = `${ BASE_URL }/upload/${ type }/${ currentImg }`;
    }

  }



  closeModal() {
    this._hiddenModal = true;
  }


}
