import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImgService } from '../../../services/modal-img.service';
import { SearcherService } from '../../../services/searcher.service';
import { UserService } from '../../../services/user.service';

import { Usuario } from '../../../models/usuario.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy{

  totalUsers: number = 0;
  users: Usuario[] = [];
  usersTmp: Usuario[] = [];

  imgSubs: Subscription;
  from: number = 0;
  loading: boolean = true;





  constructor(
    private userService: UserService,
    private searcherService: SearcherService,
    private modalImgService: ModalImgService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }





  ngOnInit(): void {

    this.loadUsers();

    this.imgSubs = this.modalImgService.newImg
      .pipe(
        delay(100)
      )
      .subscribe( img => this.loadUsers() );

  }


  loadUsers() {

    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({ total, usuarios }) => {

      // console.log(resp);
      this.totalUsers = total;
      this.users = usuarios;
      this.loading = false;
      this.usersTmp = usuarios;

    }, error => {
      console.log(error);

    });

  }


  changePage(value: number) {

    this.from += value;

    if (this.from < 0) {
      this.from = 0;

    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();

  }




  search( term: string ) {

    if( term.length === 0) {
      return this.users = this.usersTmp;
    }

    this.searcherService.search( 'usuarios', term).subscribe( (resp: Usuario[]) => {
      this.users = resp;
      // console.log( this.users );
    });
  }



  deleteUser( user: Usuario ) {

    if( user.uid === this.userService.uid ) {
      return Swal.fire('Error', 'No se puede borrar a si mismo', 'error');
    }

    // console.log(user);
    Swal.fire({
      title: '¿Estas seguro de borrar el usuario?',
      text: `Estás a punto de borrar a ${ user.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.userService.deleteUser( user.uid ).subscribe( resp => {

          this.loadUsers();

          Swal.fire(
            'Usuario borrado',
            `El usuario <b>${ user.nombre }</b> se ha borrado con éxito`,
            'success'
          );

        }, error => {

          console.log('[user.component] Error el eliminar el usuario');
          console.log(error);
        });
      }
    });
  }




  changeRole( user: Usuario ) {

    this.userService.saveUser( user ).subscribe( resp => {

      // console.log(resp);

    }, error => {
      console.log('Error al cambiar el rol del usuario');
      console.log(error);
    });
  }



  openImgModal( user: Usuario) {

    // console.log('Abrir el modal de la imagen');
    // console.log(user);
    this.modalImgService.openModal( 'usuarios', user.uid, user.img );

  }



}
