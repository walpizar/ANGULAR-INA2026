import { AfterViewInit, Component, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../services/categoria-service';
import { Categoria } from '../../../models/categoria.model';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-categoria',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './lista-categoria.html',
  styleUrl: './lista-categoria.scss',
})
export class ListaCategoria implements OnInit, AfterViewInit {
  categorias: Categoria[] = [];
  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);

  private toastr = inject(ToastrService);

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  // dataSource!: MatTableDataSource<Categoria>;
  dataSource = new MatTableDataSource<Categoria>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //forzar el renderizado de la tabla después de cargar los datos
  @ViewChild(MatTable) table!: MatTable<Categoria>;

  //hooks
  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        //this.categorias = data;
        //this.dataSource = new MatTableDataSource<Categoria>(this.categorias);

        // Actualizar el dataSource con los nuevos datos
        this.dataSource.data = data;
        this.table.renderRows();
      },
      error: (error) => {
        console.error('Error al cargar las categorias:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createModificaCategoria(categoria: Categoria | null, isMod: boolean): void {
    // Lógica para crear una nueva categoría
    const dialogRef = this.dialog.open(CategoriaForm, {
      width: '600px',
      height: '800px',
      data: { categoria, isModificar: isMod }, // Puedes pasar datos si es nesarioec
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      //modificar o crear según el caso
      if (isMod && categoria) {
        this.categoriaService.modificarCategoria(result).subscribe({
          next: (data) => {
            console.log('Categoría actualizada:', data);
            this.toastr.success('Categoría actualizada correctamente', 'Éxito');
            this.loadCategorias(); // Recargar la lista después de actualizar
          },
          error: (error) => {
            console.error('Error al actualizar la categoría:', error);
            this.toastr.error('Error al actualizar la categoría', 'Error');
          },
        });
      } else {
        this.categoriaService.createCategoria(result).subscribe({
          next: (data) => {
            console.log('Categoría creada:', data);
            this.toastr.success('Categoría creada correctamente', 'Éxito');
            this.loadCategorias(); // Recargar la lista después de crear
          },
          error: (error) => {
            console.error('Error al crear la categoría:', error);
            this.toastr.error('Error al crear la categoría', 'Error');
          },
        });
      }
    });
  }
  eliminarCategoria(cat: Categoria): void {
    if (confirm(`¿Estás seguro de eliminar la categoría "${cat.nombre}"?`)) {
      this.categoriaService.eliminarCategoria(cat.id).subscribe({
        next: () => {
          console.log('Categoría eliminada');
          this.toastr.success('Categoría eliminada correctamente', 'Éxito');
          this.loadCategorias(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar la categoría:', error);
          this.toastr.error('Error al eliminar la categoría', 'Error');
        },
      });
    }
  }
}
