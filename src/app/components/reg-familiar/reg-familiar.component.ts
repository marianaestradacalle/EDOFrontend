import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reg-familiar',
  templateUrl: './reg-familiar.component.html',
  styleUrls: ['./reg-familiar.component.scss'],
})
export class RegFamiliarComponent implements OnInit {

  forma: FormGroup;
  parametro: any;
  @Input() paciente: any;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController) {
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

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
