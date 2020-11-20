import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';
import { SearcherService } from '../../../services/searcher.service';

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

}
