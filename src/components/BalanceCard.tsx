import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../styles/theme';
import { Account } from '../types/banking';
import { formatMoney, normalizePhoneAccount } from '../utils';

type Props = {
  account: Account;
};

export function BalanceCard({ account }: Props) {
  const progress = Math.min(account.savingsBalance / account.savingsGoal, 1);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Cuenta móvil principal</Text>
          <Text style={styles.phone}>{normalizePhoneAccount(account.phoneAccount)}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{account.ibanAlias}</Text>
        </View>
      </View>

      <Text style={styles.balanceLabel}>Saldo disponible</Text>
      <Text style={styles.balance}>{formatMoney(account.balance, account.currency)}</Text>

      <View style={styles.metaRow}>
        <View>
          <Text style={styles.metaLabel}>Tarjeta virtual</Text>
          <Text style={styles.metaValue}>•••• {account.cardLast4}</Text>
        </View>
        <View style={styles.savingsBlock}>
          <Text style={styles.metaLabel}>Meta ahorro</Text>
          <Text style={styles.metaValue}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs
  },
  badgeText: {
    color: '#D8FFF4',
    fontSize: 12,
    fontWeight: '800'
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: theme.spacing.xs
  },
  balanceLabel: {
    color: '#9FB0BD',
    fontSize: 14,
    marginTop: theme.spacing.xl
  },
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: 34,
    overflow: 'hidden',
    padding: theme.spacing.lg
  },
  eyebrow: {
    color: '#9FB0BD',
    fontSize: 13,
    fontWeight: '700'
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  metaLabel: {
    color: '#9FB0BD',
    fontSize: 12,
    marginBottom: 4
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl
  },
  metaValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  },
  phone: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4
  },
  progressFill: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    height: '100%'
  },
  progressTrack: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: theme.radius.pill,
    height: 8,
    marginTop: theme.spacing.md
  },
  savingsBlock: {
    alignItems: 'flex-end'
  }
});
