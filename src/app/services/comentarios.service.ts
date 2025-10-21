import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentarios } from '../models/comentarios.model';


@Injectable({ providedIn: 'root' })
export class ComentariosService {
constructor(private http: HttpClient) {}


list(limit = 12, offset = 0): Observable<{ items: Comentarios[]; count: number }> {
return this.http.get<{ items: Comentarios[]; count: number }>(`${this.base}?limit=${limit}&offset=${offset}`);
}


create(payload: { mensagem: string}): Observable<Comentarios> {
return this.http.post<Comentarios>(this.base, payload);
}
}