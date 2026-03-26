import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
@Component({
  selector: 'app-home',
  imports: [...MATERIAL_IMPORTS, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  titulo: string = 'Bienvenidos INA APP! xxxxx';
}
