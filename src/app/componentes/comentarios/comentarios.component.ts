import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  comentarios = [
    { usuario: 'Usuário', texto: 'Excelente plataforma! Recomendo muito.' },
    { usuario: 'Usuário', texto: 'Muito prático e fácil de usar.' },
    { usuario: 'Usuário', texto: 'Serviço confiável e rápido!' },
    { usuario: 'Usuário', texto: 'Adorei a experiência, voltarei a usar.' }
  ];
}