import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Hospital } from '../../../models/hospitals.model';
import { Doctor } from '../../../models/doctor.model';

import { HospitalService } from '../../../services/hospital.service';
import { DoctorsService } from '../../../services/doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[];

  doctorSelected: Doctor;
  hospitalSelected: Hospital;


  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorsService: DoctorsService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.doctorForm = this.fb.group({
      nombre: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe( hospitalId => {

      this.hospitalSelected = this.hospitals.find( h => h._id === hospitalId );
    });

  }




  loadHospitals() {

    this.hospitalService.loadHospitals().subscribe( ( hospitals: Hospital[] ) => {

      // console.log(hospitals);
      this.hospitals = hospitals;

    }, error => {
      console.log('[Error al intentar cargar los hospitales]', error);
    });

  }




  saveDoctor() {

    const { nombre } = this.doctorForm.value;

    this.doctorsService.createDoctor( this.doctorForm.value ).subscribe( ( resp: any ) => {

      // console.log(resp);
      Swal.fire('Hecho', `Se creo el médico <b>${ nombre }</b> correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);

    }, error => {
      console.log('[Error al crear un nuevo médico]', error);
    });


  }


}
