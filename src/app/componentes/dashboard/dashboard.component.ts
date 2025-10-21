// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { NgIf } from '@angular/common';

// serviço que busca dados do backend
import { DashboardService, DashboardChartData } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // imports necessários para o template deste componente standalone
  imports: [RouterLink, HttpClientModule, BaseChartDirective, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  // logout - remove token e redireciona
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pagina-login']);
  }

  // configurações do gráfico
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  public barChartType: ChartConfiguration['type'] = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // chama o serviço para obter os dados do backend
  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardChartData) => {
        this.barChartData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar dados do gráfico.';
        this.loading = false;
      }
    });
  }
}
