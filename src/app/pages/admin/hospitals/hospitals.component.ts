import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospitals.model';
import Swal from 'sweetalert2';
import { ModalImgService } from '../../../services/modal-img.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[];
  loading: boolean = true;
  private imgSubs: Subscription;



  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService
  ) { }


  ngOnInit(): void {

    this.loadHospitals();

    this.imgSubs = this.modalImgService.newImg
      .pipe(
        delay(100)
      )
      .subscribe( img => this.loadHospitals() );
  }




  loadHospitals(): any {

    this.loading = true;
    this.hospitalService.loadHospitals().subscribe( hospitals => {

      // console.log(hospitals);
      this.hospitals = hospitals;

      this.loading = false;
    }, error => {

      console.error('Error al cargar los hospitales');
    });

  }




  saveHospital( hospital: Hospital) {

    // console.log(hospital);
    this.hospitalService.updateHospital( hospital._id, hospital.nombre).subscribe( resp => {

      Swal.fire('Hecho', 'Se ha actualizado el Hospital con éxito', 'success');

    }, error => {
      console.log('Error al actualiza rel Hospital');
      console.log(error);
    });

  }




  deleteHospital( hospital: Hospital) {

    // console.log(hospital);
    this.hospitalService.deleteHospital( hospital._id ).subscribe( resp => {

      this.loadHospitals();
      Swal.fire('Hecho', 'Se ha eliminado el Hospital con éxito', 'success');

    }, error => {

      console.log('Error al eliminar el Hospital');
      console.log(error);
    });

  }





  async openSweetAlert() {

    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre del Hospital',
      inputPlaceholder: 'Ingrese el nombre del Hospital',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    });

    if( value.trim().length > 0 ) {

      this.hospitalService.createHospital( value ).subscribe( ( resp: any ) => {

        this.hospitals.push( resp.hospital );
      }, error => {
        console.log('Error al crear el hospital');
        console.log(error);
      });

    }
  }





  openImgModal( hospital: Hospital ) {

    this.modalImgService.openModal( 'hospitales', hospital._id, hospital.img );

  }

}
