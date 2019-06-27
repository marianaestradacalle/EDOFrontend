import { Component, OnInit } from '@angular/core';
import { datos } from '../../../imagenes';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {

  data = datos;

  animation = {
    speed: 300,
    loop: true,    
  grabCursor: true,
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  }
  constructor() {}

  ngOnInit() {}



}   
