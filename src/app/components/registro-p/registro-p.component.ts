import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgModel, Validators, AbstractControl } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-registro-p',
  templateUrl: './registro-p.component.html',
  styleUrls: ['./registro-p.component.scss'],
})
export class RegistroPComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private alertService: AlertsService) {

    this.forma = new FormGroup({
      cc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8,10}'), Validators.maxLength(10), Validators.minLength(8)]),
      // tslint:disable-next-line:max-line-length
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      // tslint:disable-next-line:max-line-length
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      // tslint:disable-next-line:max-line-length
      genero: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{1,10}'), Validators.maxLength(10), Validators.minLength(1)]),
      fechaNacimiento: new FormControl('', [Validators.required, this.fechaValidate]),
      tarjeta: new FormControl('', [Validators.required])
    });
    console.log(this.forma);
  }


  get ccForm() { return this.forma.get('cc'); }
  get nombreForm() { return this.forma.get('nombre'); }
  get apellidoForm() { return this.forma.get('apellidos'); }
  get generoForm() { return this.forma.get('genero'); }
  get fechaNForm() { return this.forma.get('fechaNacimiento'); }
  get tarjetaForm() { return this.forma.get('tarjeta'); }

  fechaValidate(control: AbstractControl) {
    if (new Date(control.value).getTime() >= new Date().getTime()) {
      return { error: 'Fecha invalida' };
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

  registrarP(form: NgModel) {
    this.pacienteService.registroP(form.value).subscribe(value => {
      this.pacienteService.Paciente = value;
      this.clearForm();
      this.router.navigate(['inicio/paciente']);
      console.log(value);
    });
    console.log(form);
  }

  clearForm() {
    this.forma.reset();
  }


}
