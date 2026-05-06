import { Account, Contact, QuickAction, Transaction } from '../types/banking';

export const account: Account = {
  holderName: 'Lucía Martín',
  phoneAccount: '+34 612 345 678',
  ibanAlias: 'MOVIL · 5678',
  balance: 8240.35,
  currency: 'EUR',
  cardLast4: '9231',
  savingsGoal: 12000,
  savingsBalance: 7600
};

export const quickActions: QuickAction[] = [
  { id: 'send', label: 'Enviar', icon: '→', accent: '#00D09C' },
  { id: 'request', label: 'Solicitar', icon: '↓', accent: '#8B5CF6' },
  { id: 'card', label: 'Tarjeta', icon: '◧', accent: '#38BDF8' },
  { id: 'spaces', label: 'Espacios', icon: '◎', accent: '#F59E0B' }
];

export const favoriteContacts: Contact[] = [
  { id: 'ana', name: 'Ana Ruiz', phone: '+34 600 111 222', initials: 'AR' },
  { id: 'marco', name: 'Marco Silva', phone: '+34 677 010 101', initials: 'MS' },
  { id: 'sofia', name: 'Sofía Chen', phone: '+34 688 445 512', initials: 'SC' }
];

export const transactions: Transaction[] = [
  {
    id: 'tx-001',
    title: 'Nómina Acme Labs',
    subtitle: 'Ingreso instantáneo',
    amount: 3200,
    type: 'income',
    category: 'Trabajo',
    date: 'Hoy'
  },
  {
    id: 'tx-002',
    title: 'Ana Ruiz',
    subtitle: 'Bizum por móvil',
    amount: -42.5,
    type: 'transfer',
    category: 'Amigos',
    date: 'Ayer'
  },
  {
    id: 'tx-003',
    title: 'Netflix',
    subtitle: 'Suscripción mensual',
    amount: -15.99,
    type: 'expense',
    category: 'Ocio',
    date: 'Lun'
  },
  {
    id: 'tx-004',
    title: 'Mercado Central',
    subtitle: 'Pago con tarjeta virtual',
    amount: -64.2,
    type: 'expense',
    category: 'Compra',
    date: 'Dom'
  }
];
