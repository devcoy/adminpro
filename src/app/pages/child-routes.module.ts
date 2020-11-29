import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { HospitalsComponent } from './admin/hospitals/hospitals.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { DoctorComponent } from './admin/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    { path: 'ajustes-de-cuenta', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
    { path: 'buscar/:term', component: SearchComponent, data: { title: 'Búsqueda' } },
    { path: 'graphics1', component: Graphics1Component, data: { title: 'Gráficas' } },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progressbar' } },
    { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
    { path: 'perfil', component: ProfileComponent, data: { title: 'Perfil de usuario' } },

    // Admin
    { path: 'usuarios', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Administración de Usuarios' } },

    { path: 'hospitales', component: HospitalsComponent, data: { title: 'Administración de Hospitales' } },
    { path: 'medicos', component: DoctorsComponent, data: { title: 'Administración de Médicos' } },
    { path: 'medico/:id', component: DoctorComponent, data: { title: 'Administración de Médico' } }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
