import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-imports';

@Component({
  selector: 'app-footer',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
