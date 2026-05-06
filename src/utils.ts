import { CurrencyCode } from './types/banking';

export function formatMoney(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function normalizePhoneAccount(phone: string): string {
  return phone.replace(/\s/g, '');
}
