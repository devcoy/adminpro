import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

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

          i = 0;
          observer.error('i llego al valor de 2');

        }

      }, 1000);
    });

    obs$.pipe(

      retry(1)

    ).subscribe( value => {
      console.log('[Subs] ', value);
    },
    err => console.warn('[Error]', err),
    () => console.log('[Terminado] Obs terminado'));
  }

  ngOnInit(): void {
  }

}
