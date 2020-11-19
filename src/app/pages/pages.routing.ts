import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'ajustes-de-cuenta', component: AccountSettingsComponent, data: {title: 'Ajustes de cuenta'} },
      { path: 'graphics1', component: Graphics1Component, data: {title: 'Gráficas'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progressbar'} },
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
      { path: 'perfil', component: ProfileComponent, data: { title: 'Perfil de usuario'} }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
