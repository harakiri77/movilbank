import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionPill } from '../components/ActionPill';
import { BalanceCard } from '../components/BalanceCard';
import { ContactChip } from '../components/ContactChip';
import { TransactionRow } from '../components/TransactionRow';
import { account, favoriteContacts, quickActions, transactions } from '../data/mockBanking';
import { theme } from '../styles/theme';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {account.holderName.split(' ')[0]}</Text>
            <Text style={styles.subGreeting}>Tu móvil es tu cuenta bancaria</Text>
          </View>
          <View style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Enviar por nombre o número móvil"
            placeholderTextColor={theme.colors.muted}
            style={styles.searchInput}
            keyboardType="phone-pad"
          />
        </View>

        <BalanceCard account={account} />

        <View style={styles.actionPanel}>
          {quickActions.map((action) => (
            <ActionPill key={action.id} action={action} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contactos frecuentes</Text>
          <Text style={styles.sectionLink}>Ver todos</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsRail}>
          {favoriteContacts.map((contact) => (
            <ContactChip key={contact.id} contact={contact} />
          ))}
        </ScrollView>

        <View style={styles.transferCard}>
          <View style={styles.transferIcon}>
            <Text style={styles.shieldIcon}>✓</Text>
          </View>
          <View style={styles.transferCopy}>
            <Text style={styles.transferTitle}>Pagos instantáneos y seguros</Text>
            <Text style={styles.transferText}>Comparte tu número móvil para recibir dinero sin IBAN visible.</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          <Text style={styles.sectionLink}>Filtrar</Text>
        </View>
        <View style={styles.transactionsCard}>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionPanel: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg
  },
  contactsRail: {
    marginHorizontal: -theme.spacing.md,
    paddingLeft: theme.spacing.md
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  greeting: {
    color: theme.colors.ink,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.7
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg
  },
  notificationButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    height: 48,
    justifyContent: 'center',
    width: 48
  },
  notificationIcon: {
    fontSize: 20
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4
  },
  searchIcon: {
    color: theme.colors.muted,
    fontSize: 22,
    fontWeight: '900'
  },
  searchInput: {
    color: theme.colors.ink,
    flex: 1,
    fontSize: 15,
    minHeight: 46
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm
  },
  sectionLink: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '800'
  },
  sectionTitle: {
    color: theme.colors.ink,
    fontSize: 20,
    fontWeight: '900'
  },
  subGreeting: {
    color: theme.colors.muted,
    fontSize: 15,
    marginTop: 4
  },
  transactionsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md
  },
  transferCard: {
    alignItems: 'center',
    backgroundColor: '#E9FFF7',
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md
  },
  transferCopy: {
    flex: 1
  },
  transferIcon: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.pill,
    height: 52,
    justifyContent: 'center',
    width: 52
  },
  shieldIcon: {
    color: theme.colors.accent,
    fontSize: 24,
    fontWeight: '900'
  },
  transferText: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3
  },
  transferTitle: {
    color: theme.colors.ink,
    fontSize: 16,
    fontWeight: '900'
  }
});
