import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  private _hiddenModal: boolean = true;


  get hiddenModal() {
    return this._hiddenModal;
  }


  openModal() {
    this._hiddenModal = false;
  }



  closeModal() {
    this._hiddenModal = true;
  }

  constructor() { }
}
