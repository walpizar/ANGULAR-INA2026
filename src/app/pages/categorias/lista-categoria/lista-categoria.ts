import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../services/categoria-service';
import { Categoria } from '../../../models/categoria.model';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-categoria',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './lista-categoria.html',
  styleUrl: './lista-categoria.scss',
})
export class ListaCategoria implements OnInit {
  categorias: Categoria[] = [];
  private categoriaService = inject(CategoriaService);

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //hooks
  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
      },
      error: (error) => {
        console.error('Error al cargar las categorias:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
