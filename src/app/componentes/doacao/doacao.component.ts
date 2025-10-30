import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE!
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.css']
})
export class DoacaoComponent {
  valorDoacao: number = 10;
  instituicaoSelecionada: string = '';
  carregando = false;
  mensagem = '';

  instituicoes = [
    { nome: 'Caritas Paroquial', pix: 'caritas@paroquia.org' },
    { nome: 'Casa da Esperança', pix: 'doacoes@esperanca.org' },
    { nome: 'Projeto Mãos Abertas', pix: 'contato@maosabertas.org' }
  ];

  constructor(private MercadoPagoService: MercadoPagoService, private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['pagina-login']); // redireciona para a página de login
  }
  doar() {
    if (!this.instituicaoSelecionada || this.valorDoacao <= 0) {
      this.mensagem = 'Por favor, selecione uma instituição e um valor válido.';
      return;
    }
    this.carregando = true;
    this.mensagem = 'Criando preferência de pagamento...';

    const dados = {
      title: `Doação para ${this.instituicaoSelecionada}`,
      quantity: 1,
      price: this.valorDoacao,
      description: `Doação via PIX ${this.instituicaoSelecionada}`,
      redirectUrls: {
        success: 'http://localhost:4200/success',
        failure: 'http://localhost:4200/failure',
        pending: 'http://localhost:4200/pending'
      }
    };

    this.MercadoPagoService.createPayment(dados).subscribe({
      next: (res) => {
        this.carregando = false;
        if (res.init_point) {
          window.open(res.init_point, '_blank'); // Abre o checkout Mercado
        } else {
          this.mensagem = 'Erro: link de pagamento não retornado.';
        }
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
        this.mensagem = 'Erro ao criar preferência.';
      }
    });
  }
}
