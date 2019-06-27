import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { RegistroEventPage } from '../registro-event/registro-event.page';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @Input() paciente;
  event = {
    nombre: '',
    descripcion: '',
    inicio: '',
    fin: '',
    dia: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  evento: RegistroEventPage;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    @Inject(LOCALE_ID) private locale: string,
    private modalController: ModalController,
    private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  ionViewWillEnter() {
    this.getEventos();
  }
  getEventos() {
    this.eventSource = [];
    this.eventoService.getAll(this.paciente._id)
      .subscribe((values: any[]) => {
        for (const eve of values) {
          const eventCopy = {
            title: eve.nombre,
            startTime: new Date(eve.inicio),
            endTime: new Date(eve.fin),
            allDay: eve.dia,
            desc: eve.descripcion
          };
          this.eventSource.push(eventCopy);
        }
        console.log(values)
      })
  }

  // Change current month/week/day
  next() {

    // tslint:disable-next-line:no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    // tslint:disable-next-line:no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.nombre,
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: {
        'paciente': this.paciente,
      }
    });
    return await modal.present();
  }
  agregar() {
    this.presentModal(RegistroEventPage)
  }
}
