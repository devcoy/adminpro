import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctor.service';
import { SearcherService } from '../../../services/searcher.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  doctorsTmp: Doctor[];
  loading: boolean = false;
  imgSubs: Subscription;


  constructor(
    private doctorService: DoctorsService,
    private searcherService: SearcherService,
    private modalImgService: ModalImgService
  ) { }

  ngOnInit(): void {

    this.loadDoctors();

    this.imgSubs = this.modalImgService.newImg
      .pipe(
        delay(100)
      )
      .subscribe( img => this.loadDoctors() );

  }




  loadDoctors() {

    this.loading = true;

    this.doctorService.loadDoctors().subscribe( doctors => {

      // console.log(doctors);
      this.doctors = doctors;
      this.doctorsTmp = doctors;
      this.loading = false;

    }, error => {
      console.log('[Error al cargar los médicos]', error);

    });

  }




  openImgModal( doctor: Doctor ) {

    this.modalImgService.openModal( 'medicos', doctor._id, doctor.img );

  }




  deleteDoctor( doctor: Doctor ) {

    // console.log(user);
    Swal.fire({
      title: '¿Estas seguro de borrar al Médico?',
      text: `Estás a punto de borrar a ${ doctor.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.doctorService.deleteDoctor( doctor._id ).subscribe( resp => {

          this.loadDoctors();

          Swal.fire(
            'Médico borrado',
            `El médico <b>${ doctor.nombre }</b> se ha borrado con éxito`,
            'success'
          );

        }, error => {

          console.log('[user.component] Error el eliminar el médico');
          console.log(error);
        });
      }
    });
  }




  search( term: string ) {

    if( term.length === 0) {
      return this.doctors = this.doctorsTmp;
    }
    // console.log(term);

    this.searcherService.search( 'medicos', term).subscribe( ( resp: Doctor[] ) => {
      // console.log(resp);
      this.doctors = resp;
    });
  }



}
