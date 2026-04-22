import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authServices';
import { LoginModel } from '../../../models/loginModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  //inyecicon de dependencias, para acceder al objeto de servicio de autenticacion
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginModel).subscribe({
        next: (resp) => {
          this.authService.saveSession(resp);
          //redireccion a la pagina de inicio dashaboard
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        },
        error: (error) => {
          console.log('Error', error);
        },
      });
    }
  }
}
