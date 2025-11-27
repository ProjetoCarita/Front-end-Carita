import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComentariosService {
  private baseUrl = 'https://backend-carita-1.onrender.com';

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comentario`);
  }

  getComentarioById(id: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comentario/${id}`);
  }

  getComentariosByUsuario(id_usuario: number | string, token: string | null): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/comentario/usuario/${id_usuario}`, { headers });
  }

  postComentario(payload: any, token: string | null): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/comentario`, payload, { headers });
  }

  putComentario(id: number | string, payload: any, token: string | null): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put(`${this.baseUrl}/comentario/${id}`, payload, { headers });
  }

  deleteComentario(id: number | string, token: string | null): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete(`${this.baseUrl}/comentario/${id}`, { headers });
  }
}
