import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Inicio',
          url: '/',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
        {
          title: 'Gráfica',
          url: 'graphics1',
        }
      ]
    }
  ];
  constructor() { }
}
