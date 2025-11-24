import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpsService } from '../../services/nps.service';

@Component({
  selector: 'app-nps-survey',
  standalone: true, // Componente standalone
  imports: [CommonModule, FormsModule], // Importa módulos necessários
  templateUrl: './nps-survey.component.html',
  styleUrls: ['./nps-survey.component.css']
})
export class NpsSurveyComponent {
  @Output() closed = new EventEmitter<void>();
  @Input() categoria = 'geral';
  @Input() exibirComoModal = true;
  @Input() tituloPersonalizado?: string;

  score: number | null = null;
  comentario = '';
  isSubmitted = false;
  isLoading = false;
  error = '';

  scores = Array.from({ length: 11 }, (_, i) => i);

  constructor(private npsService: NpsService) {}

  selecionarScore(scoreSelecionado: number): void {
    this.score = scoreSelecionado;
    this.error = '';
  }

  getScoreClass(score: number): string {
    if (this.score === score) {
      if (score <= 6) return 'selected detractor';
      if (score <= 8) return 'selected passive';
      return 'selected promoter';
    }
    return '';
  }

  getPergunta(): string {
    if (this.tituloPersonalizado) return this.tituloPersonalizado;
    
    if (this.score === null) return 'Qual a probabilidade de você nos recomendar a um amigo ou colega?';
    
    if (this.score <= 6) {
      return 'O que podemos fazer para melhorar?';
    } else if (this.score <= 8) {
      return 'O que faria você nos dar uma nota maior?';
    } else {
      return 'O que mais você gosta no nosso produto/serviço?';
    }
  }

  async enviar(): Promise<void> {
    if (this.score === null) {
      this.error = 'Por favor, selecione uma nota';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      await this.npsService.enviarResposta({
        score: this.score,
        comentario: this.comentario,
        categoria: this.categoria
      }).toPromise();

      this.isSubmitted = true;
      
      setTimeout(() => {
        this.closed.emit();
      }, 2000);

    } catch (error) {
      this.error = 'Erro ao enviar resposta. Tente novamente.';
      console.error('Erro NPS:', error);
    } finally {
      this.isLoading = false;
    }
  }

  fechar(): void {
    this.closed.emit();
  }
}