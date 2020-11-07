import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {

    const obs$ = new Observable( observer => {

      let i = -1;
      const intervalo = setInterval( () => {

        i++;
        observer.next(i);
        if ( i === 4 ) {

          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 2) {

          observer.error('i llego al valor de 2');

        }

      }, 1000);
    });

    obs$.subscribe( value => {
      console.log('[Subs] ', value);
    },
    err => console.warn('[Error] ', err),
    () => console.log('[Terminado] Obs terminado'));
  }

  ngOnInit(): void {
  }

}
