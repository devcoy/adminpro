import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

import Swal from 'sweetalert2';
import { single, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  usuario: Usuario;
  erros: string[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.usuario = userService.usuario;

  }






  ngOnInit(): void {

    this.profileForm = this.fb.group({

      nombre: [ this.usuario.nombre , [ Validators.required ] ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }










  updateProfile() {

    // console.log('Tratando de actualizar usuario');
    this.userService.updateProfile( this.profileForm.value ).subscribe( resp => {

      const { nombre, email } = resp.usuarioActualizado;

      this.usuario.nombre = nombre;
      this.usuario.email  = email;

      Swal.fire('Hecho', resp.msg, 'success');


    }, error => {
      console.log(error);

    });
  }


}
