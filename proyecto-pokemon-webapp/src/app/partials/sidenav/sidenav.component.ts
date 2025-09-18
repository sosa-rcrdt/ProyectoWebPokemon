import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/service/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy{
  // Controla si el sidenav está abierto o cerrado (se enlaza con el template)
  public isSidenavOpen: boolean = false;

  // Página actualmente activa (para marcar el enlace "active")
  public currentPage: string = 'home';

  // Suscripción al observable del servicio para gestionar el sidenav
  // == Una suscripción es un tipo de observable que permite escuchar y reaccionar a los cambios de datos en tiempo real. ==
  private sidenavSub!: Subscription;

  /**
   * @param router          Para navegar entre rutas
   * @param sidenavService  Servicio para controlar el estado del sidenav
   */

  constructor(
    private router: Router,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    // 1) Nos suscribimos al estado del SidenavService
    this.sidenavSub = this.sidenavService.open$
      .subscribe((open: boolean) => {
        this.isSidenavOpen = open;
      });

    // 2) Inicializamos currentPage desde la URL actual
    const path = this.router.url.split('/')[1]; // == El Split divide una cadena en un array de subcadenas ==
    this.currentPage = path ? path: 'home';
  }

  ngOnDestroy(): void {
    // Liberamos la suscripción para evitar memory leaks
    this.sidenavSub.unsubscribe();
  }

  // Invocado desde el navbar para alternar el estado del sidenav
  public toggleSidenav(): void {
    this.sidenavService.toggle();
  }

  /**
   * Navegar a una página y marcarla como activa
   * y cerrar el sidenav en pantallas pequeñas (como móviles)
   * @param page Nombre de la ruta (e.g., 'home', 'pokemons')
   */

  public showPage(page: string): void {
    this.currentPage = page;
    this.router.navigate([`/${page}`]); // El signo ${} sirve para acceder a variables dentro de una cadena de texto
    // La comilla invertida `` permite incrustar expresiones, es decir, evaluar variables o realizar operaciones dentro de una cadena de texto.
    this.sidenavService.close();
  }
}