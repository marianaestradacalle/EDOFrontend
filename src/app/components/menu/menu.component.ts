import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  Opciones: Opcion[] = [
    {
      icon: 'home',
      titulo: 'Inicio',
      redirectTo: '/inicio/tarjetas'
  },
  {
    icon: 'person',
    titulo: 'Paciente',
    redirectTo: '/inicio/paciente'
},
{
    icon: 'contacts',
    titulo: 'Nosotros',
    redirectTo: '/inicio/nosotros'
}
];

  constructor() { }

  ngOnInit() {}

}

export interface Opcion {
  icon: string;
  titulo: string;
  redirectTo: string;
}
