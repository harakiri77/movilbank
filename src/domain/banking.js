const PHONE_ACCOUNT_PREFIX = 'MB';

export function normalizePhoneNumber(value) {
  return String(value || '')
    .replace(/[^+\d]/g, '')
    .replace(/^00/, '+');
}

export function isValidMobileAccount(value) {
  const phone = normalizePhoneNumber(value);
  return /^\+?[1-9]\d{8,14}$/.test(phone);
}

export function createAccountAlias(phoneNumber) {
  const normalized = normalizePhoneNumber(phoneNumber);
  if (!isValidMobileAccount(normalized)) {
    throw new Error('El número móvil no tiene un formato válido.');
  }
  const digits = normalized.replace(/\D/g, '');
  return `${PHONE_ACCOUNT_PREFIX}-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(-4)}`;
}

export function maskMobileAccount(phoneNumber) {
  const normalized = normalizePhoneNumber(phoneNumber);
  const digits = normalized.replace(/\D/g, '');
  if (digits.length < 4) return normalized;
  return `${normalized.startsWith('+') ? '+' : ''}${digits.slice(0, 2)} ••• ••• ${digits.slice(-4)}`;
}

export function formatCurrency(amount, currency = 'EUR', locale = 'es-ES') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateAvailableBalance(transactions, initialBalance = 0) {
  return transactions.reduce((total, transaction) => total + transaction.amount, initialBalance);
}

export function groupSpendingByCategory(transactions) {
  return transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((categories, transaction) => {
      const category = transaction.category || 'Otros';
      categories[category] = (categories[category] || 0) + Math.abs(transaction.amount);
      return categories;
    }, {});
}

export function buildTransfer({ fromPhone, toPhone, amount, concept }) {
  if (!isValidMobileAccount(fromPhone) || !isValidMobileAccount(toPhone)) {
    throw new Error('Origen y destino deben ser números móviles válidos.');
  }
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('El importe debe ser mayor que cero.');
  }
  return {
    id: `trf-${Date.now()}`,
    title: `Envío a ${maskMobileAccount(toPhone)}`,
    subtitle: concept || 'Transferencia móvil inmediata',
    category: 'Transferencias',
    amount: -Math.round(numericAmount * 100) / 100,
    status: 'Procesada',
    date: new Date().toISOString(),
    fromAccount: createAccountAlias(fromPhone),
    toAccount: createAccountAlias(toPhone),
  };
}

export const demoProfile = {
  name: 'Lucía Martín',
  phoneNumber: '+34 612 345 678',
  plan: 'Smart',
  currency: 'EUR',
  initialBalance: 4380.75,
};

export const demoTransactions = [
  {
    id: 'txn-001',
    title: 'Nómina Acme Labs',
    subtitle: 'Ingreso recurrente',
    category: 'Ingresos',
    amount: 2850,
    status: 'Completada',
    date: '2026-05-03T09:15:00.000Z',
  },
  {
    id: 'txn-002',
    title: 'Alquiler vivienda',
    subtitle: 'Domiciliación mensual',
    category: 'Hogar',
    amount: -980,
    status: 'Completada',
    date: '2026-05-02T07:30:00.000Z',
  },
  {
    id: 'txn-003',
    title: 'Mercado Central',
    subtitle: 'Tarjeta virtual •••• 4482',
    category: 'Comida',
    amount: -64.9,
    status: 'Completada',
    date: '2026-05-01T18:42:00.000Z',
  },
  {
    id: 'txn-004',
    title: 'Metro y movilidad',
    subtitle: 'Pago contactless',
    category: 'Transporte',
    amount: -18.5,
    status: 'Completada',
    date: '2026-04-30T11:10:00.000Z',
  },
  {
    id: 'txn-005',
    title: 'Suscripción CloudBox',
    subtitle: 'Próximo cargo estimado 06/06',
    category: 'Servicios',
    amount: -12.99,
    status: 'Programada',
    date: '2026-04-29T06:00:00.000Z',
  },
];

export const demoSpaces = [
  { id: 'space-1', name: 'Viaje a Lisboa', saved: 720, goal: 1200, emoji: '✈️' },
  { id: 'space-2', name: 'Fondo emergencia', saved: 2100, goal: 5000, emoji: '🛡️' },
  { id: 'space-3', name: 'Nueva bici', saved: 310, goal: 650, emoji: '🚲' },
];
