import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, OnInit, Inject, LOCALE_ID, ViewChild, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { EventoService } from '../services/evento.service';


@Component({
  selector: 'app-registro-event',
  templateUrl: './registro-event.page.html',
  styleUrls: ['./registro-event.page.scss'],
})
export class RegistroEventPage implements OnInit {

  @Input() paciente;
  event = {
    nombre: '',
    descripcion: '',
    inicio: '',
    fin: '',
    Dia: false,
    paciente: '',
    recordar: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private eventoService: EventoService) { }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      nombre: '',
      descripcion: '',
      inicio: new Date().toISOString(),
      fin: new Date().toISOString(),
      Dia: false,
      paciente: this.paciente._id,
      recordar: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    const eventCopy = {
      title: this.event.nombre,
      startTime: new Date(this.event.inicio),
      endTime: new Date(this.event.fin),
      allDay: this.event.Dia,
      desc: this.event.descripcion
    };

    if (eventCopy.allDay) {
      const start = eventCopy.startTime;
      const end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventoService.registrar(this.event)
      .subscribe(value => console.log('value', value));
    this.eventoService.registrar
    this.eventSource.push(eventCopy);

    this.resetEvent();
    // this.router.navigate(['calendar']);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.Titulo,
      subHeader: event.descripcion,
      message: 'De: ' + start + '<br><br>Hasta: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.event.inicio = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.fin = (selected.toISOString());
  }

}
