import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  buildTransfer,
  calculateAvailableBalance,
  createAccountAlias,
  demoProfile,
  demoSpaces,
  demoTransactions,
  formatCurrency,
  groupSpendingByCategory,
  isValidMobileAccount,
  maskMobileAccount,
  normalizePhoneNumber,
} from './src/domain/banking';

const quickActions = [
  { label: 'Enviar', icon: 'paper-plane-outline' },
  { label: 'Solicitar', icon: 'download-outline' },
  { label: 'Tarjetas', icon: 'card-outline' },
  { label: 'Analítica', icon: 'pie-chart-outline' },
];

const tabs = ['Inicio', 'Movimientos', 'Espacios'];

export default function App() {
  const [profile, setProfile] = useState(demoProfile);
  const [phoneInput, setPhoneInput] = useState(demoProfile.phoneNumber);
  const [transactions, setTransactions] = useState(demoTransactions);
  const [activeTab, setActiveTab] = useState('Inicio');
  const [transferPhone, setTransferPhone] = useState('+34 699 112 233');
  const [transferAmount, setTransferAmount] = useState('25');

  const balance = useMemo(
    () => calculateAvailableBalance(transactions, profile.initialBalance),
    [profile.initialBalance, transactions],
  );
  const categories = useMemo(() => groupSpendingByCategory(transactions), [transactions]);
  const accountAlias = useMemo(() => createAccountAlias(profile.phoneNumber), [profile.phoneNumber]);

  function updateMobileAccount() {
    const normalized = normalizePhoneNumber(phoneInput);
    if (!isValidMobileAccount(normalized)) {
      Alert.alert('Número no válido', 'Introduce un móvil internacional válido. Ejemplo: +34 612 345 678');
      return;
    }
    setProfile((current) => ({ ...current, phoneNumber: normalized }));
  }

  function sendTransfer() {
    try {
      const transfer = buildTransfer({
        fromPhone: profile.phoneNumber,
        toPhone: transferPhone,
        amount: transferAmount,
        concept: 'Pago entre móviles MóvilBank',
      });
      setTransactions((current) => [transfer, ...current]);
      setTransferAmount('');
      Alert.alert('Transferencia enviada', `Destino: ${transfer.toAccount}`);
    } catch (error) {
      Alert.alert('Revisa la transferencia', error.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Cuenta móvil</Text>
              <Text style={styles.greeting}>Hola, {profile.name}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LM</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroLabel}>Saldo disponible</Text>
                <Text style={styles.balance}>{formatCurrency(balance, profile.currency)}</Text>
              </View>
              <View style={styles.planBadge}>
                <Ionicons name="sparkles-outline" color="#07111f" size={14} />
                <Text style={styles.planText}>Plan {profile.plan}</Text>
              </View>
            </View>
            <View style={styles.accountPanel}>
              <Text style={styles.accountLabel}>Tu número móvil es tu cuenta</Text>
              <Text style={styles.accountNumber}>{maskMobileAccount(profile.phoneNumber)}</Text>
              <Text style={styles.accountAlias}>{accountAlias}</Text>
            </View>
          </View>

          <View style={styles.mobileEditor}>
            <Text style={styles.sectionTitle}>Configurar cuenta por móvil</Text>
            <Text style={styles.helpText}>
              Usa tu teléfono como identificador de cuenta para recibir pagos inmediatos sin IBAN visible.
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={setPhoneInput}
                placeholder="+34 612 345 678"
                placeholderTextColor="#7a8798"
                style={styles.input}
                value={phoneInput}
              />
              <TouchableOpacity onPress={updateMobileAccount} style={styles.primarySmallButton}>
                <Text style={styles.primarySmallButtonText}>Activar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.quickGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.label} style={styles.quickAction}>
                <Ionicons name={action.icon} color="#1fb6ff" size={22} />
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'Inicio' && (
            <View style={styles.sectionStack}>
              <TransferCard
                amount={transferAmount}
                onAmountChange={setTransferAmount}
                onPhoneChange={setTransferPhone}
                onSend={sendTransfer}
                phone={transferPhone}
              />
              <SecurityCard />
              <SpendingCard categories={categories} currency={profile.currency} />
            </View>
          )}

          {activeTab === 'Movimientos' && (
            <View style={styles.sectionStack}>
              <Text style={styles.sectionTitle}>Actividad reciente</Text>
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} currency={profile.currency} transaction={transaction} />
              ))}
            </View>
          )}

          {activeTab === 'Espacios' && (
            <View style={styles.sectionStack}>
              <Text style={styles.sectionTitle}>Espacios de ahorro</Text>
              {demoSpaces.map((space) => (
                <SpaceCard key={space.id} currency={profile.currency} space={space} />
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TransferCard({ amount, onAmountChange, onPhoneChange, onSend, phone }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.sectionTitle}>Enviar dinero</Text>
          <Text style={styles.helpText}>Transferencias instantáneas usando solo el móvil del destinatario.</Text>
        </View>
        <Ionicons name="flash-outline" color="#00d68f" size={24} />
      </View>
      <TextInput
        keyboardType="phone-pad"
        onChangeText={onPhoneChange}
        placeholder="Móvil destino"
        placeholderTextColor="#7a8798"
        style={styles.fullInput}
        value={phone}
      />
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onAmountChange}
        placeholder="Importe"
        placeholderTextColor="#7a8798"
        style={styles.fullInput}
        value={amount}
      />
      <TouchableOpacity onPress={onSend} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Enviar ahora</Text>
      </TouchableOpacity>
    </View>
  );
}

function SecurityCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Control de seguridad</Text>
      <View style={styles.securityGrid}>
        <SecurityItem icon="phone-portrait-outline" label="Cuenta móvil verificada" />
        <SecurityItem icon="finger-print-outline" label="Biometría activada" />
        <SecurityItem icon="lock-closed-outline" label="Tarjeta congelable" />
      </View>
    </View>
  );
}

function SecurityItem({ icon, label }) {
  return (
    <View style={styles.securityItem}>
      <Ionicons name={icon} color="#00d68f" size={20} />
      <Text style={styles.securityText}>{label}</Text>
    </View>
  );
}

function SpendingCard({ categories, currency }) {
  const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, amount]) => amount), 1);
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Análisis de gastos</Text>
      {entries.map(([category, amount]) => (
        <View key={category} style={styles.categoryRow}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>{category}</Text>
            <Text style={styles.categoryAmount}>{formatCurrency(amount, currency)}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.max((amount / max) * 100, 8)}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

function TransactionRow({ currency, transaction }) {
  const isIncome = transaction.amount > 0;
  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, isIncome && styles.incomeIcon]}>
        <Ionicons name={isIncome ? 'arrow-down-outline' : 'arrow-up-outline'} color={isIncome ? '#00d68f' : '#1fb6ff'} size={18} />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
      </View>
      <View style={styles.transactionAmountBox}>
        <Text style={[styles.transactionAmount, isIncome && styles.incomeText]}>
          {formatCurrency(transaction.amount, currency)}
        </Text>
        <Text style={styles.statusText}>{transaction.status}</Text>
      </View>
    </View>
  );
}

function SpaceCard({ currency, space }) {
  const percent = Math.min((space.saved / space.goal) * 100, 100);
  return (
    <View style={styles.card}>
      <View style={styles.spaceHeader}>
        <Text style={styles.spaceEmoji}>{space.emoji}</Text>
        <View style={styles.flex}>
          <Text style={styles.spaceName}>{space.name}</Text>
          <Text style={styles.helpText}>
            {formatCurrency(space.saved, currency)} de {formatCurrency(space.goal, currency)}
          </Text>
        </View>
        <Text style={styles.percentText}>{Math.round(percent)}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#07111f' },
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 44 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: '#7aa5c7', fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  greeting: { color: '#ffffff', fontSize: 26, fontWeight: '800', marginTop: 4 },
  avatar: { alignItems: 'center', backgroundColor: '#1fb6ff', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 },
  avatarText: { color: '#07111f', fontWeight: '900' },
  heroCard: { backgroundColor: '#11243a', borderRadius: 30, padding: 22, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 18 },
  heroTopRow: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  heroLabel: { color: '#9fb3c8', fontSize: 14, fontWeight: '600' },
  balance: { color: '#ffffff', fontSize: 38, fontWeight: '900', marginTop: 8 },
  planBadge: { alignItems: 'center', backgroundColor: '#d7f75b', borderRadius: 18, flexDirection: 'row', gap: 5, paddingHorizontal: 10, paddingVertical: 7 },
  planText: { color: '#07111f', fontSize: 12, fontWeight: '900' },
  accountPanel: { backgroundColor: '#0b1828', borderRadius: 22, marginTop: 22, padding: 16 },
  accountLabel: { color: '#7aa5c7', fontSize: 13, fontWeight: '700' },
  accountNumber: { color: '#ffffff', fontSize: 22, fontWeight: '800', marginTop: 7 },
  accountAlias: { color: '#00d68f', fontSize: 14, fontWeight: '800', marginTop: 6 },
  mobileEditor: { backgroundColor: '#0c1a2b', borderColor: '#173553', borderRadius: 24, borderWidth: 1, marginTop: 18, padding: 16 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: '900' },
  helpText: { color: '#9fb3c8', fontSize: 13, lineHeight: 19, marginTop: 5 },
  inputRow: { alignItems: 'center', flexDirection: 'row', gap: 10, marginTop: 14 },
  input: { backgroundColor: '#07111f', borderRadius: 16, color: '#ffffff', flex: 1, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  primarySmallButton: { backgroundColor: '#1fb6ff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 },
  primarySmallButtonText: { color: '#07111f', fontWeight: '900' },
  quickGrid: { flexDirection: 'row', gap: 10, marginTop: 18 },
  quickAction: { alignItems: 'center', backgroundColor: '#0c1a2b', borderRadius: 20, flex: 1, paddingVertical: 15 },
  quickLabel: { color: '#ffffff', fontSize: 12, fontWeight: '800', marginTop: 8 },
  tabBar: { backgroundColor: '#0c1a2b', borderRadius: 20, flexDirection: 'row', marginTop: 20, padding: 5 },
  tab: { alignItems: 'center', borderRadius: 16, flex: 1, paddingVertical: 10 },
  activeTab: { backgroundColor: '#ffffff' },
  tabText: { color: '#9fb3c8', fontSize: 13, fontWeight: '800' },
  activeTabText: { color: '#07111f' },
  sectionStack: { gap: 14, marginTop: 18 },
  card: { backgroundColor: '#0c1a2b', borderColor: '#173553', borderRadius: 24, borderWidth: 1, padding: 17 },
  cardHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  fullInput: { backgroundColor: '#07111f', borderRadius: 16, color: '#ffffff', fontSize: 16, marginTop: 12, paddingHorizontal: 14, paddingVertical: 14 },
  primaryButton: { alignItems: 'center', backgroundColor: '#1fb6ff', borderRadius: 18, marginTop: 14, paddingVertical: 15 },
  primaryButtonText: { color: '#07111f', fontSize: 15, fontWeight: '900' },
  securityGrid: { gap: 10, marginTop: 14 },
  securityItem: { alignItems: 'center', backgroundColor: '#07111f', borderRadius: 16, flexDirection: 'row', gap: 10, padding: 13 },
  securityText: { color: '#ffffff', fontWeight: '800' },
  categoryRow: { marginTop: 14 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryName: { color: '#ffffff', fontWeight: '800' },
  categoryAmount: { color: '#9fb3c8', fontWeight: '700' },
  progressTrack: { backgroundColor: '#07111f', borderRadius: 99, height: 8, overflow: 'hidden' },
  progressFill: { backgroundColor: '#1fb6ff', borderRadius: 99, height: '100%' },
  transactionRow: { alignItems: 'center', backgroundColor: '#0c1a2b', borderRadius: 20, flexDirection: 'row', gap: 12, padding: 14 },
  transactionIcon: { alignItems: 'center', backgroundColor: '#102b44', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  incomeIcon: { backgroundColor: '#0f3027' },
  transactionCopy: { flex: 1 },
  transactionTitle: { color: '#ffffff', fontSize: 15, fontWeight: '900' },
  transactionSubtitle: { color: '#9fb3c8', fontSize: 12, marginTop: 3 },
  transactionAmountBox: { alignItems: 'flex-end' },
  transactionAmount: { color: '#ffffff', fontWeight: '900' },
  incomeText: { color: '#00d68f' },
  statusText: { color: '#7aa5c7', fontSize: 11, marginTop: 4 },
  securityAccent: { color: '#00d68f' },
  spaceHeader: { alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 14 },
  spaceEmoji: { fontSize: 30 },
  spaceName: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  percentText: { color: '#d7f75b', fontSize: 16, fontWeight: '900' },
});
