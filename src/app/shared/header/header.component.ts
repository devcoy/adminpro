import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.usuario = userService.usuario;
  }



  logout() {

    this.userService.logout();
  }




  search( term: string) {

    if( term.length === 0) {
      this.router.navigate( ['/dashboard'] );
    }
    this.router.navigateByUrl(`/dashboard/buscar/${ term }`);

  }

}
