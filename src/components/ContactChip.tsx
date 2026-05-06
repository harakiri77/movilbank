import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../styles/theme';
import { Contact } from '../types/banking';

type Props = {
  contact: Contact;
};

export function ContactChip({ contact }: Props) {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <View style={styles.avatar}>
        <Text style={styles.initials}>{contact.initials}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.line,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    padding: theme.spacing.sm,
    width: 178
  },
  copy: {
    flex: 1
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900'
  },
  name: {
    color: theme.colors.ink,
    fontSize: 14,
    fontWeight: '800'
  },
  phone: {
    color: theme.colors.muted,
    fontSize: 11,
    marginTop: 2
  }
});
