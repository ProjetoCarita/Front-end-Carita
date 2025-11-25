import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NPSResposta {
  score: number;
  comentario?: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NpsService {
  private apiUrl = 'http://localhost:3000/api/nps';

  constructor(private http: HttpClient) { }

  enviarResposta(resposta: NPSResposta): Observable<any> {
    return this.http.post(`${this.apiUrl}/respostas`, resposta);
  }
}