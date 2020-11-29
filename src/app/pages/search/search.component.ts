import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospitals.model';
import { Doctor } from '../../models/doctor.model';

import { SearcherService } from '../../services/searcher.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  users: Usuario[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];



  constructor(
    private activatedRoute: ActivatedRoute,
    private searcherService: SearcherService
  ) { }



  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ term }) => {
      // console.log(term);
      this.globalSearch( term );
    });
  }




  globalSearch( term: string ) {

    this.searcherService.globalSearch( term ).subscribe( ( resp: any ) => {

      // console.log(resp);
      this.users = resp.usuarios;
      this.hospitals = resp.hospitales;
      this.doctors = resp.medicos;

    }, error => {
      console.log('[Error el hacer la búsqueda global]', error);
    });

  }




  viewDoctor( doctor: Doctor) {

  }

}
