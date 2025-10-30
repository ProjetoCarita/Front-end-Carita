import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ComentariosService } from '../../services/comentarios.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-avaliacao-site',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './avaliacao-site.component.html',
  styleUrls: ['./avaliacao-site.component.css'] // corrigido
})
export class AvaliacaoSiteComponent {
  AvaliacaoForm: FormGroup;
  showAlert = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private comentariosService: ComentariosService
  ) {
    this.AvaliacaoForm = this.fb.group({
      mensagem: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.AvaliacaoForm.valid) {
      const idUsuario = Number(localStorage.getItem('idUsuario')); // pega id do usuário logado
      const token = localStorage.getItem('token'); // pega token do login

      const payload = {
        mensagem: this.AvaliacaoForm.value.mensagem,
        id_usuario: idUsuario // ⚠️ usar id_usuario com underline
      };

      this.comentariosService.postComentario(payload, token).subscribe({
        next: (res) => {
          console.log('Comentário enviado com sucesso:', res);
          this.showAlert = true;
          this.AvaliacaoForm.reset();
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
