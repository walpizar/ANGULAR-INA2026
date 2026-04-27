import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { Categoria } from '../../../models/categoria.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { R } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-categoria-form',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.scss',
})
export class CategoriaForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CategoriaForm>);
  data = inject(MAT_DIALOG_DATA) as { categoria: Categoria | null; isModificar: boolean };

  form = this.fb.group({
    id: [{ value: this.data.categoria?.id || '', disabled: true }],

    nombre: [
      this.data.categoria?.nombre || '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],

    descripcion: [
      this.data.categoria?.descripcion || '',
      [Validators.required, Validators.maxLength(500)],
    ],
  });

  constructor() {
    console.log('Datos recibidos:', this.data);
    //detalle
    if (!this.data.isModificar && this.data.categoria) {
      this.form.disable();
    }
  }

  guardar() {
    if (this.form.valid) {
      const categoriaData = this.form.getRawValue() as Categoria;

      console.log('Datos a guardar:', categoriaData);
      this.dialogRef.close(categoriaData);
    }
  }
}
