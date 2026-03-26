import { Component, signal } from '@angular/core';
import { Home } from './pages/home/home';
import { MATERIAL_IMPORTS } from './shared/material-imports';

@Component({
  selector: 'app-root',
  imports: [Home, ...MATERIAL_IMPORTS],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('inaApp');
}
