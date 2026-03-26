import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';
import { Footer } from '../../layout/footer/footer';
@Component({
  selector: 'app-home',
  imports: [...MATERIAL_IMPORTS, Footer, RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  titulo: string = 'Bienvenidos INA APP! xxxxx';

  opened = true;

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/inicio' },
    { icon: 'person', label: 'Perfil', route: '/perfil' },
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'shopping_cart', label: 'Pedidos', route: '/pedidos' },
    { icon: 'settings', label: 'Configuración', route: '/configuracion' },
  ];
}
