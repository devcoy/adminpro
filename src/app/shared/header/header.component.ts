import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario;

  constructor(
    private userService: UserService
  ) {
    this.usuario = userService.usuario;
  }



  logout() {

    this.userService.logout();
  }

}
