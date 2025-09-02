import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Evento {
  id: string;
  title: string;
  start: string;
  end?: string;
  address: string;
  description: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  events: Evento[] = [];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: this.events,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  // 👉 Criar evento com formulário simples (via prompt)
  handleDateClick(arg: any) {
    const title = prompt('Nome do evento:');
    if (!title) return;

    const address = prompt('Endereço do evento:') || '';
    const startTime = prompt('Hora de início (HH:mm):') || '00:00';
    const endTime = prompt('Hora de término (HH:mm):') || '';
    const description = prompt('Descrição do evento:') || '';

    const start = `${arg.dateStr}T${startTime}`;
    const end = endTime ? `${arg.dateStr}T${endTime}` : undefined;

    const newEvent: Evento = {
      id: Date.now().toString(),
      title,
      start,
      end,
      address,
      description
    };

    this.events = [...this.events, newEvent];
    this.calendarOptions.events = this.events;
  }

  // 👉 Remover evento
  handleEventClick(arg: any) {
    const evento = this.events.find(e => e.id === arg.event.id);
    if (!evento) return;

    const confirmDelete = confirm(
      `Deseja remover o evento "${evento.title}"?\nEndereço: ${evento.address}\nDescrição: ${evento.description}`
    );

    if (confirmDelete) {
      this.events = this.events.filter(e => e.id !== arg.event.id);
      this.calendarOptions.events = this.events;
    }
  }
  
}
