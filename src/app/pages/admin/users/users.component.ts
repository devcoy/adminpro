import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';
import { SearcherService } from '../../../services/searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: Usuario[] = [];
  usersTmp: Usuario[] = [];
  from: number = 0;
  loading: boolean = true;





  constructor(
    private userService: UserService,
    private searcherService: SearcherService
  ) { }





  ngOnInit(): void {

    this.loadUsers();

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

    this.searcherService.search( 'usuarios', term).subscribe( resp => {
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

}
