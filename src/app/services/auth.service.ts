import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface LoginResponse {
  role: string;
  token: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/autenticacao'; 

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, { email, senha });
  }
  
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUserId(id: number) {
    localStorage.setItem('userId', id.toString());
  }

  saveRole(role: string) {
  localStorage.setItem('role', role);
}

getRole(): string | null {
  return localStorage.getItem('role');
}

  logout() {
    localStorage.removeItem('token');
  }
}
