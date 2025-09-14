
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { sampleProperties } from '../data/properties';
import Icon from '../components/Icon';

export default function AdminScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('properties');

  const handleLogin = () => {
    if (username === 'MR_Rajayi' && password === 'Hesam14563') {
      setIsLoggedIn(true);
      Alert.alert('موفق', 'با موفقیت وارد شدید');
    } else {
      Alert.alert('خطا', 'نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>پنل مدیریت</Text>
            <Text style={styles.loginSubtitle}>مشاور املاک رجایی</Text>
            
            <TextInput
              style={[commonStyles.input, styles.loginInput]}
              placeholder="نام کاربری"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            
            <TextInput
              style={[commonStyles.input, styles.loginInput]}
              placeholder="رمز عبور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={buttonStyles.primary} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>ورود</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>بازگشت به صفحه اصلی</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>خروج</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>پنل مدیریت</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'properties' && styles.activeTab]}
          onPress={() => setActiveTab('properties')}
        >
          <Text style={[styles.tabText, activeTab === 'properties' && styles.activeTabText]}>
            املاک
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
            آمار
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            تنظیمات
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content}>
        {activeTab === 'properties' && (
          <View>
            <View style={styles.sectionHeader}>
              <TouchableOpacity style={buttonStyles.primary}>
                <Text style={styles.buttonText}>افزودن ملک جدید</Text>
              </TouchableOpacity>
              <Text style={commonStyles.subtitle}>مدیریت املاک</Text>
            </View>
            
            {sampleProperties.map((property) => (
              <View key={property.id} style={styles.propertyItem}>
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyTitle}>{property.title}</Text>
                  <Text style={styles.propertyPrice}>
                    {(property.price / 1000000000).toFixed(1)} میلیارد تومان
                  </Text>
                  <Text style={styles.propertyArea}>{property.area} متر</Text>
                </View>
                <View style={styles.propertyActions}>
                  <TouchableOpacity style={styles.editButton}>
                    <Icon name="create-outline" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Icon name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'stats' && (
          <View>
            <Text style={commonStyles.subtitle}>آمار کلی</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Icon name="home-outline" size={32} color={colors.primary} />
                <Text style={styles.statNumber}>{sampleProperties.length}</Text>
                <Text style={styles.statLabel}>کل املاک</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="star-outline" size={32} color={colors.accent} />
                <Text style={styles.statNumber}>
                  {sampleProperties.filter(p => p.isFeatured).length}
                </Text>
                <Text style={styles.statLabel}>املاک ویژه</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="cash-outline" size={32} color={colors.success} />
                <Text style={styles.statNumber}>
                  {Math.round(sampleProperties.reduce((sum, p) => sum + p.price, 0) / 1000000000)}B
                </Text>
                <Text style={styles.statLabel}>ارزش کل (میلیارد)</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="resize-outline" size={32} color={colors.secondary} />
                <Text style={styles.statNumber}>
                  {Math.round(sampleProperties.reduce((sum, p) => sum + p.area, 0) / sampleProperties.length)}
                </Text>
                <Text style={styles.statLabel}>متراژ متوسط</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'settings' && (
          <View>
            <Text style={commonStyles.subtitle}>تنظیمات</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>تغییر رمز عبور</Text>
              <TouchableOpacity style={buttonStyles.outline}>
                <Text style={styles.settingButtonText}>تغییر</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>پشتیبان گیری از داده‌ها</Text>
              <TouchableOpacity style={buttonStyles.outline}>
                <Text style={styles.settingButtonText}>دانلود</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>تنظیمات اعلان‌ها</Text>
              <TouchableOpacity style={buttonStyles.outline}>
                <Text style={styles.settingButtonText}>تنظیم</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginCard: {
    backgroundColor: colors.card,
    padding: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  loginInput: {
    width: '100%',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  logoutText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  propertyItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'right',
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
    textAlign: 'right',
  },
  propertyArea: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  propertyActions: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.backgroundAlt,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.backgroundAlt,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  settingItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
  },
  settingButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
