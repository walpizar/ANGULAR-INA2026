import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [...MATERIAL_IMPORTS, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  opened = true;

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/inicio' },
    { icon: 'person', label: 'Perfil', route: '/perfil' },
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'shopping_cart', label: 'Pedidos', route: '/pedidos' },
    { icon: 'settings', label: 'Configuración', route: '/configuracion' },
  ];
}
