import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../styles/theme';
import { Transaction } from '../types/banking';
import { formatMoney } from '../utils';

type Props = {
  transaction: Transaction;
};

const iconByType = {
  income: '↓',
  expense: '•',
  transfer: '↔'
} as const;

export function TransactionRow({ transaction }: Props) {
  const isPositive = transaction.amount > 0;

  return (
    <View style={styles.row}>
      <View style={[styles.icon, isPositive && styles.iconPositive]}>
        <Text style={[styles.iconText, isPositive && styles.iconTextPositive]}>{iconByType[transaction.type]}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.subtitle}>{transaction.subtitle} · {transaction.category}</Text>
      </View>
      <View style={styles.amountBlock}>
        <Text style={[styles.amount, isPositive ? styles.positive : styles.negative]}>
          {formatMoney(transaction.amount, 'EUR')}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 15,
    fontWeight: '900'
  },
  amountBlock: {
    alignItems: 'flex-end'
  },
  copy: {
    flex: 1
  },
  date: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 3
  },
  icon: {
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: theme.radius.pill,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  iconPositive: {
    backgroundColor: '#DDFCEF'
  },
  iconText: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  iconTextPositive: {
    color: theme.colors.accent
  },
  negative: {
    color: theme.colors.ink
  },
  positive: {
    color: theme.colors.accent
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 4
  },
  title: {
    color: theme.colors.ink,
    fontSize: 15,
    fontWeight: '800'
  }
});
