import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: Usuario[] = [];
  from: number = 0;





  constructor(
    private userService: UserService
  ) { }





  ngOnInit(): void {

    this.loadUsers();

  }


  loadUsers() {

    this.userService.loadUsers(this.from).subscribe(({ total, usuarios }) => {

      // console.log(resp);
      this.totalUsers = total;
      this.users = usuarios;

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

}
