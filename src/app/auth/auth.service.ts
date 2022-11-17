// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
  constructor() {

  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem("token");

    return !jwtHelper.isTokenExpired(token);
  }
}