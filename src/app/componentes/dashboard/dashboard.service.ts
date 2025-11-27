/* // src/app/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Tipagem dos dados vindos do backend
export interface DashboardChartData {
  labels: string[];
  datasets: Array<{
    label?: string;
    data: number[];
    backgroundColor?: string[]; 
    borderColor?: string[];
    [key: string]: any; // permite configs extras do Chart.js
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000'; // raiz do backend

  constructor(private http: HttpClient) {}

  // Requisição GET para o endpoint do dashboard
  getDashboardData(): Observable<DashboardChartData> {
    return this.http.get<DashboardChartData>(`${this.baseUrl}/dashboard`);
  }
} */

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
  private baseUrl = 'https://backend-carita-1.onrender.com';

  constructor(private http: HttpClient) {}

  // Faz requisição GET no backend
  getDashboardData(): Observable<DashboardChartData> {
  const token = localStorage.getItem('token');

  return this.http.get<DashboardChartData>(`${this.baseUrl}/usuarios/dashboard-data`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}
