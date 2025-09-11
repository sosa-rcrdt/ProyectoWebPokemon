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
  public isSideNavOpen: boolean = false;

  public currentPage: string = 'home';

  public currentUser: User | null = null;

  private userSub!: Subscription;
  private sidenavSub!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly sidenavService: SidenavService
  ) {}

  public ngOnInit(): void {
    this.userSub = this.authService.currentUser$
      .subscribe((user: User | null) => this.currentUser = user);

    this.sidenavSub = this.sidenavService.open$
      .subscribe((open: boolean) => this.isSideNavOpen = open);

    /** split sirve para dividir una cadena en un array de subcadenas */
    const path = this.router.url.split('/')[1];
    this.currentPage = path || 'home';
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.sidenavSub.unsubscribe();
  }

  public toggleSidenav(): void {
    this.sidenavService.toggle();
  }

  public showPage(page: string): void {
    this.currentPage = page;
    this.router.navigate([`/${page}`]);
  }

  public toggleAuth(): void {
    if (this.currentUser) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }
}