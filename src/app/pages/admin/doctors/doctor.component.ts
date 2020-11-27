import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospitals.model';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {

    this.doctorForm = this.fb.group({
      nombre: [ 'Jorge', Validators.required],
      hospital: [ '' ]
    });


    this.loadHospitals();

  }




  loadHospitals() {

    this.hospitalService.loadHospitals().subscribe( ( hospitals: Hospital[] ) => {

      console.log(hospitals);
      this.hospitals = hospitals;


    }, error => {
      console.log('[Error al intentar cargar los hospitales]', error);
    });

  }




  saveDoctor() {

    console.log(this.doctorForm.value);

  }


}
