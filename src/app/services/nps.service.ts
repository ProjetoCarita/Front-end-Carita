import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NPSResposta {
  score: number;
  comentario?: string;
  categoria?: string;
}

export interface NPSEstatisticas {
  nps: number;
  totalRespostas: number;
  promotores: number;
  neutros: number;
  detratores: number;
  pontuacaoMedia: number;
  distribuicao: number[];
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

  obterEstatisticas(dataInicio?: string, dataFim?: string, categoria?: string): Observable<NPSEstatisticas> {
    let params: any = {};
    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;
    if (categoria) params.categoria = categoria;

    return this.http.get<NPSEstatisticas>(`${this.apiUrl}/estatisticas`, { params });
  }
}