import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../styles/theme';
import { QuickAction } from '../types/banking';

type Props = {
  action: QuickAction;
};

export function ActionPill({ action }: Props) {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: `${action.accent}20` }]}>
        <Text style={[styles.icon, { color: action.accent }]}>{action.icon}</Text>
      </View>
      <Text style={styles.label}>{action.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.sm
  },
  icon: {
    fontSize: 22,
    fontWeight: '900'
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: theme.radius.pill,
    height: 56,
    justifyContent: 'center',
    width: 56
  },
  label: {
    color: theme.colors.ink,
    fontSize: 13,
    fontWeight: '700'
  }
});
