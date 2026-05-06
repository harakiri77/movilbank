import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildTransfer,
  calculateAvailableBalance,
  createAccountAlias,
  formatCurrency,
  groupSpendingByCategory,
  isValidMobileAccount,
  maskMobileAccount,
  normalizePhoneNumber,
} from '../src/domain/banking.js';

test('normaliza y valida números móviles internacionales', () => {
  assert.equal(normalizePhoneNumber('0034 612-345-678'), '+34612345678');
  assert.equal(isValidMobileAccount('+34 612 345 678'), true);
  assert.equal(isValidMobileAccount('0000'), false);
});

test('crea alias de cuenta basado en el móvil', () => {
  assert.equal(createAccountAlias('+34 612 345 678'), 'MB-346-123-5678');
  assert.equal(maskMobileAccount('+34 612 345 678'), '+34 ••• ••• 5678');
});

test('calcula saldo y gasto por categoría', () => {
  const transactions = [
    { amount: 100, category: 'Ingresos' },
    { amount: -20, category: 'Comida' },
    { amount: -10, category: 'Comida' },
    { amount: -15, category: 'Transporte' },
  ];

  assert.equal(calculateAvailableBalance(transactions, 50), 105);
  assert.deepEqual(groupSpendingByCategory(transactions), { Comida: 30, Transporte: 15 });
});

test('construye transferencias móviles seguras', () => {
  const transfer = buildTransfer({
    fromPhone: '+34 612 345 678',
    toPhone: '+34 699 112 233',
    amount: '10.239',
    concept: 'Cena',
  });

  assert.equal(transfer.amount, -10.24);
  assert.equal(transfer.fromAccount, 'MB-346-123-5678');
  assert.equal(transfer.toAccount, 'MB-346-991-2233');
  assert.equal(transfer.status, 'Procesada');
  assert.match(transfer.title, /Envío a \+34/);
});

test('formatea importes en euros para la interfaz', () => {
  assert.equal(formatCurrency(1234.5), '1234,50 €');
});
