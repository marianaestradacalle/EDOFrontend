import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, NgModel, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EncargadoService } from 'src/app/services/encargado.service';
import { AlertsService } from '../services/alerts.service';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-registro-e',
  templateUrl: './registro-e.page.html',
  styleUrls: ['./registro-e.page.scss'],
})
export class RegistroEPage implements OnInit {

  forma: FormGroup;

  constructor(
    private router: Router,
    private encargadoService: EncargadoService,
    private alertService: AlertsService,
    private modalCtrl: ModalController) {
// 
    this.forma = new FormGroup({
      cc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8,10}'), Validators.maxLength(10), Validators.minLength(8)]),
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÑñ ]{1,30}'), Validators.maxLength(30), Validators.minLength(1)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,15}'), Validators.maxLength(15), Validators.minLength(10)]),
      contrasena: new FormControl('', [Validators.required, Validators.maxLength(14),
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.required]),
      contrasena_c: new FormControl('', [Validators.required])
    });
    console.log(this.forma);
  }

  get ccForm() { return this.forma.get('cc') }
  get nombreForm() { return this.forma.get('nombre') }
  get apellidoForm() { return this.forma.get('apellido') }
  get telefonoForm() { return this.forma.get('telefono') }
  get contrasenaForm() { return this.forma.get('contrasena') }
  get contrasenaCForm() { return this.forma.get('contrasena_c') }

  //   validar_mensaje = {
  //     'cc' : [
  //     {type: 'required', message: 'La cédula es requerida'},
  //     {type: 'required', message: 'La cédula debe contener mínimo 8 dígitos y máximo 10'}
  //     ]
  // }

  ngOnInit() {
    this.forma.get('contrasena_c').setValidators([Validators.required, this.igualContrasena.bind(this)]);
  }

  //Función para impedir que se guarde un registro no validado  
  registrarE(form: NgModel) {
    console.log(this.forma);

    if (this.forma.invalid) { return; }
    this.encargadoService.registroE(form.value).subscribe(value => {
      this.encargadoService.encargado = value;
      this.router.navigate(['home']);
      console.log(value);
    });
    console.log(form);
  }

  //Función para validar que las contraseñas sean iguales 
  igualContrasena(control: AbstractControl) {
    const datoUno = control.value;
    const datoDos = this.forma.get('contrasena').value;
    if (datoUno === datoDos) {
      return null;
    } else {
      return { error: true }
    }
  }
}
