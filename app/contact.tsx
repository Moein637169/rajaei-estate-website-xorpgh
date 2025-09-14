
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { contactInfo } from '../data/properties';
import Icon from '../components/Icon';

export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber: string) => {
    const message = 'سلام، در مورد خدمات املاک شما سوال داشتم';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  const handleSubmitForm = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      Alert.alert('خطا', 'لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    // In a real app, you would send this to your backend
    Alert.alert(
      'پیام ارسال شد',
      'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.',
      [
        {
          text: 'باشه',
          onPress: () => {
            setFormData({ name: '', phone: '', email: '', message: '' });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-forward-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>تماس با ما</Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Contact Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>اطلاعات تماس</Text>
          
          <View style={styles.contactItem}>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>آدرس</Text>
              <Text style={styles.contactText}>{contactInfo.address}</Text>
            </View>
            <Icon name="location-outline" size={24} color={colors.primary} />
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>ساعات کاری</Text>
              <Text style={styles.contactText}>{contactInfo.workingHours}</Text>
            </View>
            <Icon name="time-outline" size={24} color={colors.primary} />
          </View>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>ایمیل</Text>
              <Text style={[styles.contactText, styles.linkText]}>{contactInfo.email}</Text>
            </View>
            <Icon name="mail-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Phone Numbers */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>شماره تماس</Text>
          
          {contactInfo.phones.map((phone, index) => (
            <View key={index} style={styles.phoneContainer}>
              <View style={styles.phoneActions}>
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => handleWhatsApp(phone.number)}
                >
                  <Icon name="logo-whatsapp" size={20} color={colors.secondary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => handleCall(phone.number)}
                >
                  <Icon name="call-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.phoneInfo}>
                <Text style={styles.phoneName}>{phone.name}</Text>
                <Text style={styles.phoneNumber}>{phone.number}</Text>
              </View>
              
              <Icon name="person-circle-outline" size={40} color={colors.primary} />
            </View>
          ))}
        </View>

        {/* Contact Form */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>فرم تماس</Text>
          <Text style={commonStyles.textSecondary}>
            پیام خود را برای ما ارسال کنید
          </Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={commonStyles.input}
              placeholder="نام و نام خانوادگی *"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="شماره تماس *"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="ایمیل (اختیاری)"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            
            <TextInput
              style={[commonStyles.input, styles.messageInput]}
              placeholder="پیام شما *"
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <TouchableOpacity style={buttonStyles.primary} onPress={handleSubmitForm}>
              <Text style={styles.submitButtonText}>ارسال پیام</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Notice */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>موقعیت روی نقشه</Text>
          <View style={styles.mapPlaceholder}>
            <Icon name="map-outline" size={48} color={colors.textSecondary} />
            <Text style={commonStyles.textSecondary}>
              نمایش نقشه در نسخه وب Natively پشتیبانی نمی‌شود
            </Text>
            <Text style={styles.addressText}>{contactInfo.address}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleWhatsApp('09145375158')}
          >
            <Text style={styles.quickActionText}>واتساپ</Text>
            <Icon name="logo-whatsapp" size={24} color={colors.background} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionButton, styles.callButton]}
            onPress={() => handleCall('09145375158')}
          >
            <Text style={styles.quickActionText}>تماس فوری</Text>
            <Icon name="call" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  contactItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactContent: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  linkText: {
    color: colors.primary,
  },
  phoneContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  phoneInfo: {
    flex: 1,
    marginLeft: 16,
  },
  phoneName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  phoneNumber: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  phoneActions: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
  },
  formContainer: {
    marginTop: 16,
    gap: 16,
  },
  messageInput: {
    height: 100,
    paddingTop: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  mapPlaceholder: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    backgroundColor: colors.primary,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
