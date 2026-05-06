import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'App.tsx',
  'app.json',
  'babel.config.js',
  'package.json',
  'tsconfig.json',
  'src/screens/HomeScreen.tsx',
  'src/components/ActionPill.tsx',
  'src/components/BalanceCard.tsx',
  'src/components/ContactChip.tsx',
  'src/components/TransactionRow.tsx',
  'src/data/mockBanking.ts',
  'src/styles/theme.ts',
  'src/types/banking.ts',
  'src/utils.ts'
];

const failures = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);
const file = (path) => readFileSync(join(root, path), 'utf8');

for (const requiredFile of requiredFiles) {
  if (existsSync(join(root, requiredFile))) {
    pass(`${requiredFile} existe`);
  } else {
    fail(`${requiredFile} no existe`);
  }
}

const packageJson = JSON.parse(file('package.json'));
const appJson = JSON.parse(file('app.json'));

if (packageJson.scripts?.start === 'expo start') {
  pass('npm start inicia Expo');
} else {
  fail('package.json debe exponer "start": "expo start"');
}

if (packageJson.scripts?.test === 'node scripts/validate-app.mjs') {
  pass('npm test ejecuta la validación de la app');
} else {
  fail('package.json debe exponer "test": "node scripts/validate-app.mjs"');
}

if (appJson.expo?.name === 'MovilBank' && appJson.expo?.slug === 'movilbank') {
  pass('app.json configura la app MovilBank');
} else {
  fail('app.json debe configurar name=MovilBank y slug=movilbank');
}

const home = file('src/screens/HomeScreen.tsx');
const balance = file('src/components/BalanceCard.tsx');
const mock = file('src/data/mockBanking.ts');
const utils = file('src/utils.ts');

const expectedUiTexts = [
  'Tu móvil es tu cuenta bancaria',
  'Enviar por nombre o número móvil',
  'Contactos frecuentes',
  'Pagos instantáneos y seguros',
  'Actividad reciente'
];

for (const text of expectedUiTexts) {
  if (home.includes(text)) {
    pass(`HomeScreen muestra "${text}"`);
  } else {
    fail(`HomeScreen debe mostrar "${text}"`);
  }
}

if (balance.includes('normalizePhoneAccount(account.phoneAccount)')) {
  pass('BalanceCard usa el número móvil normalizado como cuenta');
} else {
  fail('BalanceCard debe renderizar normalizePhoneAccount(account.phoneAccount)');
}

if (/phoneAccount:\s*'\+\d{2}\s\d{3}\s\d{3}\s\d{3}'/.test(mock)) {
  pass('Los datos mock incluyen una cuenta basada en móvil');
} else {
  fail('mockBanking debe incluir phoneAccount con formato internacional');
}

for (const collection of ['quickActions', 'favoriteContacts', 'transactions']) {
  if (mock.includes(`export const ${collection}`)) {
    pass(`mockBanking exporta ${collection}`);
  } else {
    fail(`mockBanking debe exportar ${collection}`);
  }
}

if (utils.includes("new Intl.NumberFormat('es-ES'") && utils.includes("phone.replace(/\\s/g, '')")) {
  pass('Las utilidades formatean dinero y normalizan el móvil');
} else {
  fail('utils debe formatear dinero y normalizar el número móvil');
}

const forbiddenRuntimeImports = ['@expo/vector-icons', 'expo-linear-gradient'];
for (const forbiddenImport of forbiddenRuntimeImports) {
  const offenders = requiredFiles.filter((requiredFile) => file(requiredFile).includes(forbiddenImport));
  if (offenders.length === 0) {
    pass(`No hay import runtime bloqueado: ${forbiddenImport}`);
  } else {
    fail(`Import bloqueado ${forbiddenImport} encontrado en ${offenders.join(', ')}`);
  }
}

if (failures.length > 0) {
  console.error('\nValidación fallida:');
  for (const failure of failures) {
    console.error(`✗ ${failure}`);
  }
  process.exit(1);
}

console.log('\nMovilBank pasó la prueba smoke local.');
