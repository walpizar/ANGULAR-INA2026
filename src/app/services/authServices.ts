import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(loginData: LoginModel) {}
}
