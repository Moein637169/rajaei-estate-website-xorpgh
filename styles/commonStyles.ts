
import { StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';

export const colors = {
  primary: '#2E7D32',      // Green for real estate
  secondary: '#4CAF50',    // Light green
  accent: '#FF9800',       // Orange for highlights
  background: '#FFFFFF',   // White background for light theme
  backgroundAlt: '#F5F5F5', // Light grey
  text: '#212121',         // Dark text
  textSecondary: '#757575', // Grey text
  card: '#FFFFFF',         // White cards
  border: '#E0E0E0',       // Light border
  success: '#4CAF50',      // Success green
  warning: '#FF9800',      // Warning orange
  error: '#F44336',        // Error red
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'right', // RTL support
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
    textAlign: 'right',
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'right',
  },
  section: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row-reverse', // RTL support
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
    textAlign: 'right', // RTL support
  },
  searchContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'right',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.background,
  },
});
