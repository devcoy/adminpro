import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class SettingsService {

   private linkTheme = document.querySelector('#theme');

   constructor() {

      const urlTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
      this.linkTheme.setAttribute('href', urlTheme);
   }

   changeTheme(theme: string) {
      const url = `./assets/css/colors/${theme}.css`;

      this.linkTheme.setAttribute('href', url);
      localStorage.setItem('theme', url);

   }



}
