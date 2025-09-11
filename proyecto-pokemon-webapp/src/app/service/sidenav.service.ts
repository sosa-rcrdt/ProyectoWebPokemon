import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() { }

  private openSubject = new BehaviorSubject<boolean>(true);

  public open$ = this.openSubject.asObservable();

  public toggle(): void {
    this.openSubject.next(!this.openSubject.value);
  }

  public open(): void {
    this.openSubject.next(true);
  }

  public close(): void {
    this.openSubject.next(false);
  }
}
