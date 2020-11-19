import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

import Swal from 'sweetalert2';
import { single, filter, map } from 'rxjs/operators';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  usuario: Usuario;
  imgToUpload: File;
  imgTmp: any = null;




  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
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



  changeImgProfile( file: File) {
    this.imgToUpload = file;

    if( !file ) { return this.imgTmp = null; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      // console.log( reader.result);
      this.imgTmp = reader.result;
    }



  }




  uploadImg() {
    this.fileUploadService.updatePhoto( this.imgToUpload, 'usuarios', this.usuario.uid)
      .then( img => {

        this.usuario.img = img
        Swal.fire('Hecho', 'Foto de perfil actualizada', 'success');
      });
  }


}
