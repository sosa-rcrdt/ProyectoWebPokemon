import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SidenavService } from 'src/app/service/sidenav.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit , OnDestroy{
  // Controla si el sidenav está abierto o cerrado (se enlaza con el template)
  public isSideNavOpen: boolean = false;

  // Página actualmente activa (para marcar el enlace "active")
  public currentPage: string = 'home';

  // Datos del usuario actual (si está autenticado)
  public currentUser: User | null = null;

  // Suscripciones para limpiar en ngOnDestroy
  private userSub!: Subscription;
  private sidenavSub!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly sidenavService: SidenavService
  ) {}

  // Se ejecuta al montar el componente
  public ngOnInit(): void {
    // 1) Escuchar cambios en el usuario
    this.userSub = this.authService.currentUser$
      .subscribe((user: User | null) => this.currentUser = user);

    // 2) Escuchar cambios en el estado del sidenav
    this.sidenavSub = this.sidenavService.open$
      .subscribe((open: boolean) => this.isSideNavOpen = open);

    // 3) Determinar la página actual desde la URL
    const path = this.router.url.split('/')[1];
    this.currentPage = path || 'home';
  }

  // Se ejecuta al destruir el componente
  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.sidenavSub.unsubscribe();
  }

  // Alternar el estado del sidenav
  public toggleSidenav(): void {
    this.sidenavService.toggle();
  }

  // Navegar a una página y marcarla como activa
  public showPage(page: string): void {
    this.currentPage = page;
    this.router.navigate([`/${page}`]);
  }

  // Manejar login/logout según el estado de autenticación
  public toggleAuth(): void {
    if (this.currentUser) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }
}