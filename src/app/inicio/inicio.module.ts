import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';
import { ComponentsModule } from '../components/components.module';
import { NosotrosComponent } from '../components/nosotros/nosotros.component';
import { PacienteComponent } from '../components/paciente/paciente.component';
import { RegistroPComponent } from '../components/registro-p/registro-p.component';
import { InfoPacienteComponent } from '../components/info-paciente/info-paciente.component';
import { TarjetasComponent } from '../components/tarjetas/tarjetas.component';
import { CalendarPage } from '../calendar/calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { RegFamiliarComponent } from '../components/reg-familiar/reg-familiar.component';
import { ActPacienteComponent } from '../components/act-paciente/act-paciente.component';
import { RegistroEPage } from '../registro-e/registro-e.page';
import { RegistroEventPage } from '../registro-event/registro-event.page';


const routes: Routes = [
  {
    path: '', component: InicioPage, children: [
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'paciente', component: PacienteComponent },
      { path: 'registro-p', component: RegistroPComponent },
      { path: 'info-paciente/:id', component: InfoPacienteComponent },
      { path: 'tarjetas', component: TarjetasComponent },
      // { path: 'calendar', component: CalendarioComponent },
      { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarPageModule' },
      // { path: '**', pathMatch: 'full', redirectTo: 'tarjetas' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgCalendarModule,
  ],
  declarations: [InicioPage, RegFamiliarComponent, CalendarPage, RegistroEventPage, ActPacienteComponent],
  entryComponents: [RegFamiliarComponent, ActPacienteComponent, CalendarPage, RegistroEventPage]
})
export class InicioPageModule { }
