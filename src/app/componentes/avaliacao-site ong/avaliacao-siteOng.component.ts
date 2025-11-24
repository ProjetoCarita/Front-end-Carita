import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ComentariosService } from '../../services/comentarios.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-avaliacao-siteOng',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './avaliacao-siteOng.component.html',
  styleUrls: ['./avaliacao-siteOng.component.css'] // corrigido
})
export class AvaliacaoSiteOngComponent {
  AvaliacaoOngForm: FormGroup;
  showAlert = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private comentariosService: ComentariosService
  ) {
    this.AvaliacaoOngForm = this.fb.group({
      mensagem: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.AvaliacaoOngForm.valid) {
      const idUsuario = Number(localStorage.getItem('userId')); // pega id do usuário logado
      const token = localStorage.getItem('token'); // pega token do login

      const payload = {
        mensagem: this.AvaliacaoOngForm.value.mensagem,
        id_usuario: idUsuario 
      };

      this.comentariosService.postComentario(payload, token).subscribe({
        next: (res) => {
          console.log('Comentário enviado com sucesso:', res);
          this.showAlert = true;
          this.AvaliacaoOngForm.reset();
          setTimeout(() => (this.showAlert = false), 3000);
        },
        error: (err) => {
          console.error('Erro ao enviar comentário:', err);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    this.router.navigate(['/pagina-login']);
  }
}
