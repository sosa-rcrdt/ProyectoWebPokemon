import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() { }

  // Controla el estado abierto/cerrado del sidenav
  private openSubject = new BehaviorSubject<boolean>(true);

  // Observable público para que otros componentes puedan suscribirse
  public open$ = this.openSubject.asObservable();

  // Métodos para cambiar el estado del sidenav
  public toggle(): void {
    this.openSubject.next(!this.openSubject.value);
  }

  // Abrir el sidenav
  public open(): void {
    this.openSubject.next(true);
  }

  // Cerrar el sidenav
  public close(): void {
    this.openSubject.next(false);
  }
}
