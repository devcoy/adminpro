import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];


  constructor() { }



  loadMenu() {

    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    // if( this.menu.length === 0 ) {


    // }

  }
}
