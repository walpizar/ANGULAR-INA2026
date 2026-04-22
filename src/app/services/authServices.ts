import { Injectable, computed, inject, signal } from '@angular/core';
import { LoginModel, LoginResponse } from '../models/loginModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //signal
  private tokenSignal = signal<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  );

  isLoggedIn = computed(() => !!this.tokenSignal());

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  login(datos: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, datos);
  }

  saveSession(resp: LoginResponse): void {
    console.log('Login correcto', resp);
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', resp.user.toString());
    localStorage.setItem('rol', resp.role);

    // Actualizar el signal con el nuevo token
    this.tokenSignal.set(resp.token);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.tokenSignal.set(null); // Limpiar el signal al cerrar sesión
  }

  // Obtener token
  getToken(): string | null {
    return this.tokenSignal();
  }

  //  Obtener usuario
  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }
}
