// src/app/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Tipagem para os dados que virão do backend
export interface DashboardChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Faz requisição GET no backend
  getDashboardData(): Observable<DashboardChartData> {
    return this.http.get<DashboardChartData>(`${this.baseUrl}/dashboard-data`);
  }
}
