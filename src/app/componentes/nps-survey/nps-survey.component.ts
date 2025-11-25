import { Component, EventEmitter, Output, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NpsService } from '../../services/nps.service';

@Component({
  selector: 'app-nps-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nps-survey.component.html',
  styleUrls: ['./nps-survey.component.css']
})
export class NpsSurveyComponent {
  @Output() closed = new EventEmitter<void>();
  @Input() categoria = 'geral';
  @Input() exibirComoModal = true;
  @Input() tituloPersonalizado?: string;

  score: number | null = null;
  isSubmitted = false;
  isLoading = false;
  error = '';

  scores = Array.from({ length: 11 }, (_, i) => i);

  constructor(private npsService: NpsService) {}

  selecionarScore(scoreSelecionado: number): void {
    this.score = scoreSelecionado;
    this.error = '';
  }

  isScoreSelected(scoreValue: number): boolean {
    return this.score === scoreValue;
  }

  async enviar(): Promise<void> {
    if (this.score === null) {
      this.error = 'Por favor, selecione uma nota na escala NPS';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      await this.npsService.enviarResposta({
        score: this.score,
        comentario: 'Feedback do formulário de contato',
        categoria: this.categoria
      }).toPromise();

      this.isSubmitted = true;
      
      setTimeout(() => {
        this.closed.emit();
      }, 2000);

    } catch (error) {
      this.error = 'Erro ao enviar avaliação. Tente novamente.';
      console.error('Erro NPS:', error);
    } finally {
      this.isLoading = false;
    }
  }

  fechar(): void {
    this.closed.emit();
  }
}
