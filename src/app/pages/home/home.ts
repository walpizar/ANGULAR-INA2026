import { Component, computed, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';
import { Footer } from '../../layout/footer/footer';
import { AuthService } from '../../services/authServices';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [...MATERIAL_IMPORTS, Footer, RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  authService = inject(AuthService);
  router = inject(Router);
  @ViewChild('sidenav') sidenav?: MatSidenav;

  titulo: string = 'Bienvenidos INA APP! xxxxx';

  opened: boolean = true;

  menuItems = [
    { icon: 'home', label: 'Incio', route: '/dashboard' },
    { icon: 'category', label: 'Categoria', route: '/listaCategorias' },
  ];

  toggleMenu(): void {
    if (this.authService.isLoggedIn()) {
      this.sidenav?.toggle();
    }
  }

  closeMenu(): void {
    this.sidenav?.close();
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
