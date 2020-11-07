import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy{

  intervalSubs: Subscription;

  constructor() {

    // this.retornObservable().pipe(

    //   retry(1)

    // ).subscribe( value => {

    //   console.log('[Subs] ', value);
    // },
    // err => console.warn('[Error]', err),
    // () => console.log('[Terminado] Obs terminado'));

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );
  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }


  retornaIntervalo(): Observable<number> {

    return interval(300).pipe(

      map( value => value + 1),
      filter( value => ( value % 2 === 0) ? true : false),
      // take(10)
    );

  }



  retornObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {

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

  }

}
