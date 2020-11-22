import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospitals } from '../../../models/hospitals.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospitals[];
  loading: boolean = true;



  constructor(
    private hospitalService: HospitalService
  ) { }


  ngOnInit(): void {

    this.loadHospitals();
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

}
