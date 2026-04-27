import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}${environment.endpoints.categorias}`;

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.post<Categoria>(this.apiUrl, categoria, { headers: headers });
  }

  modificarCategoria(categoria: Categoria): Observable<Categoria> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.patch<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria, {
      headers: headers,
    });
  }

  eliminarCategoria(id: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ token: token });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: headers });
  }
}
