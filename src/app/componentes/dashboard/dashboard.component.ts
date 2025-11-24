// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NgIf } from '@angular/common';
import { DashboardService, DashboardChartData } from './dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule, BaseChartDirective, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private dashboardService: DashboardService) {}

  // ======== Logout ========
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pagina-login']);
  }

  // ======== Configurações do gráfico ========
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Usuários Ativos vs Inativos',
        font: {
          size: 16
        }
      }
    }
  };

  public barChartType: ChartConfiguration['type'] = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Usuários',
        data: [],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1
      }
    ]
  };

  loading = false;
  error: string | null = null;

  // ======== Ao iniciar o componente ========
  ngOnInit(): void {
    this.loadDashboardData();
  }

  // ======== Busca dados do backend ========
  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardData().subscribe({
      next: (data: DashboardChartData) => {
        // Atualiza o gráfico com os dados vindos do backend
        this.barChartData = {
          labels: data.labels,
          datasets: data.datasets.map(ds => ({
            ...ds,
            backgroundColor: ['#4CAF50', '#F44336']
          }))
        };
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar gráfico:', err);
        this.error = 'Erro ao carregar dados do gráfico.';
        this.loading = false;
      }
    });
  }
}