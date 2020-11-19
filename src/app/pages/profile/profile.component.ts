import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({

      nombre: [ 'Jorge Cervantes', [ Validators.required ] ],
      email: [ 'jorge@email.com', [ Validators.required, Validators.email ] ],
    });

  }


  updateProfile() {

    console.log('Tratando de actualizar usuario');
    this.userService.updateProfile( this.profileForm.value ).subscribe( resp => {

      console.log(resp);

    }, error => {

      console.log('error al actualiza usuario');
      console.error(error.error);
    });
  }

}
