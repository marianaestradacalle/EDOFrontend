import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  registrar(evento) {
    return this.http.post(`${environment.server}evento`, evento);
  }

  getAll(paciente) {
    return this.http.get(`${environment.server}evento/paciente/${paciente}`);
  }
}
