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
        },
        {
          title: 'Promesas',
          url: 'promesas',
        },
        {
          title: 'Rxjs',
          url: 'rxjs',
        }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuario',
          url: 'usuario',
        },
        {
          title: 'Hospitales',
          url: 'hospitales',
        },
        {
          title: 'Médicos',
          url: 'medicos',
        }
      ]
    }
  ];
  constructor() { }
}
