import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoPagoService, PaymentData } from '../../services/mercado-pago.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botaoPagamento.components.html',
  styleUrls: ['./botaoPagamento.components.css']
})
export class BotaoPagamentoComponent {
  @Input() amount: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() paymentSuccess = new EventEmitter<string>();
  @Output() paymentError = new EventEmitter<any>();

  loading: boolean = false;

  constructor(private mercadoPagoService: MercadoPagoService) {}

  async handlePayment(): Promise<void> {
    this.loading = true;

    try {
      const paymentData: PaymentData = {
        title: this.title,
        quantity: 1,
        price: this.amount,
        description: this.description,
        redirectUrls: {
          success: `${window.location.origin}/payment/success`,
          failure: `${window.location.origin}/payment/failure`,
          pending: `${window.location.origin}/payment/pending`
        }
      };

      const preference = await lastValueFrom(
        this.mercadoPagoService.createPayment(paymentData)
      );
      
      if (!preference) {
        throw new Error('Não foi possível criar a preferência de pagamento');
      }

      const paymentUrl = window.location.hostname === 'localhost' 
        ? preference.sandbox_init_point 
        : preference.init_point;

      this.mercadoPagoService.openPaymentWindow(paymentUrl);
      this.paymentSuccess.emit(preference.id);

    } catch (error) {
      console.error('Erro no pagamento:', error);
      this.paymentError.emit(error);
    } finally {
      this.loading = false;
    }
  }
}