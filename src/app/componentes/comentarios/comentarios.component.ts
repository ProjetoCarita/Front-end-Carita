import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios: any[] = [];

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.carregarComentarios();
  }

  carregarComentarios(): void {
    this.comentariosService.getComentarios().subscribe({
      next: (res) => {
        console.log('Comentários recebidos do backend:', res);
        this.comentarios = res;
      },
      error: (err) => {
        console.error('Erro ao carregar comentários:', err);
      }
    });
  }
}
