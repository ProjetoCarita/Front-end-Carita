import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Resposta esperada do backend (preferência criada)
export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

// Dados enviados ao backend
export interface PaymentData {
  title: string;
  quantity: number;
  price: number;
  description?: string;
  redirectUrls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  // Altere a URL conforme o backend
  private readonly apiUrl = 'https://backend-carita-1.onrender.com/api/payments';

  constructor(private http: HttpClient) {}

  /**
   * Cria uma preferência de pagamento (Checkout Pro)
   */
  createPayment(paymentData: PaymentData): Observable<PaymentPreference> {
    return this.http.post<PaymentPreference>(
      `${this.apiUrl}/create-preference`,
      paymentData
    );
  }

  /**
   * Consulta o status de um pagamento existente
   */
  getPaymentStatus(paymentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/${paymentId}`);
  }

  /**
   * Abre a janela do checkout Mercado Pago
   */
  openPaymentWindow(paymentUrl: string): void {
    window.open(paymentUrl, '_blank');
  }
}
