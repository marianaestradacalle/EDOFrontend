import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { ModalController } from '@ionic/angular';
import { RegFamiliarComponent } from '../reg-familiar/reg-familiar.component';
import { ActPacienteComponent } from '../act-paciente/act-paciente.component';
import { CalendarPage } from 'src/app/calendar/calendar.page';

@Component({
  selector: 'app-info-paciente',
  templateUrl: './info-paciente.component.html',
  styleUrls: ['./info-paciente.component.scss'],
})
export class InfoPacienteComponent implements OnInit {

  forma: FormGroup;
  parametro: any;
  paciente: any;

  constructor(
    private pacienteService: PacienteService,
    public modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.parametro = params;
      console.log(params);
    });

    this.forma = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      telefono: new FormControl('', Validators.pattern(''))
    });
  }

  registrarF(form: NgModel) {
    const familiares = {
      id: this.paciente._id,
      familiar: { nombre: form.value.nombre, telefono: form.value.telefono }
    };

    this.pacienteService.registrarF(familiares).subscribe(value => {
      this.clearForm();
      console.log(value);
    });
    console.log(form);
  }

  clearForm() {
    this.forma.reset();
  }

  ngOnInit() {
    this.pacienteService.getP(this.parametro.id).subscribe(value => {
      this.paciente = value;
      console.log(this.paciente);
    });
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component,
      componentProps: {
        paciente: this.paciente,
      }
    });
    return await modal.present();
  }
  regFamiliar() {
    this.presentModal(RegFamiliarComponent);
  }

  actualizar() {
    this.presentModal(ActPacienteComponent);
  }

  calendario() {
    this.presentModal(CalendarPage);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'dismissed': true
    });
  }

}
