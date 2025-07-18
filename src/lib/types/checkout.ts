export interface Address {
  departamento: string;
  provincia: string;
  distrito: string;
  calle: string;
  numero: string;
}

export interface CardDetails {
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
}

export interface CheckoutData {
  address: Address;
  deliveryOption: string;
  paymentMethod: string;
  cardDetails?: CardDetails;
  items: Array<{
    id: string;
    cantidad: number;
    precio: number;
  }>;
  subtotal: number;
  shipping?: number;
  total: number;
  termsAccepted: boolean;
  cmrTermsAccepted?: boolean;
} 