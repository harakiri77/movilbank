export type CurrencyCode = 'EUR' | 'USD';

export type Account = {
  holderName: string;
  phoneAccount: string;
  ibanAlias: string;
  balance: number;
  currency: CurrencyCode;
  cardLast4: string;
  savingsGoal: number;
  savingsBalance: number;
};

export type TransactionType = 'income' | 'expense' | 'transfer';

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  accent: string;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
};
