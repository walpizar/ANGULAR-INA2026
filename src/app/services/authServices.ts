import { Injectable, inject } from '@angular/core';
import { LoginModel, LoginResponse } from '../models/loginModel';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/auth';

  login(datos: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, datos).pipe(
      tap(
        (respuesta) => {
          // Guardar token y datos
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('usuario', respuesta.user.name);

          if (respuesta.role) {
            localStorage.setItem('rol', respuesta.role);
          }
        },
        (error) => {
          console.error('Error en login:', error);
        },
      ),
    );
  }

  // 🔑 Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 👤 Obtener usuario
  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }

  // 🛡️ Verificar autenticación
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
  }
}
