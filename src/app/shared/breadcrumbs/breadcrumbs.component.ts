import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string;
  titleSubs$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.titleSubs$ = this.getDataRoute().subscribe( ({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });

  }


  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }


  getDataRoute() {

    return this.router.events
      .pipe(
        filter( e => e instanceof ActivationEnd ),
        filter( ( e: ActivationEnd ) => e.snapshot.firstChild === null ),
        map( ( e: ActivationEnd ) =>  e.snapshot.data )
      );
  }

}
