import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";
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

  menuItems: any[];
  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {

    this.usuario = userService.usuario;
    this.menuItems = sidebarService.menu;

    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
