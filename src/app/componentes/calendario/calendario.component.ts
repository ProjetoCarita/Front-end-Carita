import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa o módulo
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule], // <-- IMPORTANTE
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  events: any[] = []; // lista de eventos

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    locales: [ptBrLocale],
    locale: 'pt-br',
    editable: true,
    selectable: true,
    events: this.events,
    // callback para seleção de datas
    select: (info: any) => this.handleDateSelect(info),
    // callback para clique em evento
    eventClick: (info: any) => this.handleEventClick(info),
  };

  // Função para adicionar novo evento
  handleDateSelect(info: any) {
    const title = prompt('Digite o nome do evento:');
    if (title) {
      const newEvent = {
        id: String(this.events.length + 1),
        title,
        start: info.start,
        end: info.end,
        allDay: info.allDay
      };
      this.events = [...this.events, newEvent]; // atualiza lista
      this.calendarOptions.events = this.events; // recarrega no calendário
    }
  }

  // Função para editar ou remover evento existente
  handleEventClick(info: any) {
    const event = info.event;

    const action = prompt(
      `Evento: ${event.title}\nDigite:\n1 - Editar título\n2 - Remover evento`
    );

    if (action === '1') {
      const newTitle = prompt('Novo título do evento:', event.title);
      if (newTitle) {
        event.setProp('title', newTitle); // altera no calendário
        this.events = this.events.map(e =>
          e.id === event.id ? { ...e, title: newTitle } : e
        );
      }
    } else if (action === '2') {
      event.remove(); // remove do calendário
      this.events = this.events.filter(e => e.id !== event.id);
    }
  }
}