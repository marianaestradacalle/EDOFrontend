import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, AbstractControl, NgModel } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-act-paciente',
  templateUrl: './act-paciente.component.html',
  styleUrls: ['./act-paciente.component.scss'],
})
export class ActPacienteComponent implements OnInit {

  @Input() paciente;
  forma: FormGroup;

  @Input() titulo: string;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private alertService: AlertsService,
    private modalCtrl: ModalController) {

    this.forma = new FormGroup({
      cc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8,10}'), Validators.maxLength(10), Validators.minLength(8)]),
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      genero: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{1,10}'), Validators.maxLength(10), Validators.minLength(1)]),
      fechaNacimiento: new FormControl('', [Validators.required, this.fechaValidate]),
      tarjeta: new FormControl('', [Validators.required])
    });
    console.log(this.forma);
  }


  get ccForm() { return this.forma.get('cc') }
  get nombreForm() { return this.forma.get('nombre') }
  get apellidoForm() { return this.forma.get('apellidos') }
  get generoForm() { return this.forma.get('genero') }
  get fechaNForm() { return this.forma.get('fechaNacimiento') }
  get tarjetaForm() { return this.forma.get('tarjeta') }

  fechaValidate(control: AbstractControl) {
    if (new Date(control.value).getTime() >= new Date().getTime()) {
      return { error: 'Fecha invalida' }
    } else {
      return null;
    }
  }


  actualizar(form: NgModel) {
    const pac =  form.value;
    pac._id = this.paciente._id;
    this.pacienteService.actualizarP(pac).subscribe(value => {
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

  ngOnInit() {
    console.log(this.paciente);
    const pac = Object.assign({}, this.paciente);
    delete pac._id;
    delete pac.__v;
    pac.tarjeta = this.paciente.tarjeta.codigo;
    console.log(this.paciente);
    console.log(pac);
    this.forma.setValue(pac);

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
