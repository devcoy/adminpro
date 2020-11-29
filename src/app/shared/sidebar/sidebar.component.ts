import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;


  constructor(
    public sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.usuario = userService.usuario;
  }



  ngOnInit(): void {}

}
