
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { contactInfo } from '../data/properties';
import Icon from '../components/Icon';

export default function AboutScreen() {
  const router = useRouter();

  const teamMembers = [
    {
      name: 'حسام رجایی',
      role: 'مدیر و مشاور ارشد',
      phone: '09145375158',
      experience: '10 سال سابقه',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'عباس رجایی',
      role: 'مشاور املاک',
      phone: '09143515158',
      experience: '8 سال سابقه',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'حمید رجایی',
      role: 'مشاور املاک',
      phone: '09144567044',
      experience: '6 سال سابقه',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
    }
  ];

  const services = [
    {
      title: 'خرید و فروش املاک',
      description: 'مشاوره کامل در خرید و فروش انواع املاک مسکونی و تجاری',
      icon: 'home-outline'
    },
    {
      title: 'اجاره املاک',
      description: 'خدمات اجاره املاک با بهترین قیمت‌ها و شرایط',
      icon: 'key-outline'
    },
    {
      title: 'ارزیابی املاک',
      description: 'ارزیابی دقیق و کارشناسی املاک توسط متخصصان',
      icon: 'calculator-outline'
    },
    {
      title: 'مشاوره سرمایه‌گذاری',
      description: 'راهنمایی در سرمایه‌گذاری‌های املاک و مستغلات',
      icon: 'trending-up-outline'
    }
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-forward-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>درباره ما</Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Company Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.title}>مشاور املاک رجایی</Text>
          <Text style={[commonStyles.textSecondary, styles.description]}>
            مشاور املاک رجایی با بیش از 10 سال سابقه در زمینه املاک و مستغلات، 
            آماده ارائه بهترین خدمات در زمینه خرید، فروش و اجاره املاک در شهر اردبیل می‌باشد.
          </Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{contactInfo.address}</Text>
            <Icon name="location-outline" size={20} color={colors.primary} />
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{contactInfo.workingHours}</Text>
            <Icon name="time-outline" size={20} color={colors.primary} />
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{contactInfo.email}</Text>
            <Icon name="mail-outline" size={20} color={colors.primary} />
          </View>
        </View>

        {/* Services */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>خدمات ما</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Icon name={service.icon as any} size={32} color={colors.primary} />
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>تیم ما</Text>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <Text style={styles.memberExperience}>{member.experience}</Text>
                <Text style={styles.memberPhone}>{member.phone}</Text>
              </View>
              <Image 
                source={{ uri: member.image }} 
                style={styles.memberImage}
              />
            </View>
          ))}
        </View>

        {/* Why Choose Us */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>چرا ما را انتخاب کنید؟</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>تجربه و تخصص</Text>
              <Text style={styles.featureDescription}>
                سال‌ها تجربه در بازار املاک اردبیل
              </Text>
            </View>
            <Icon name="star-outline" size={24} color={colors.accent} />
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>مشاوره رایگان</Text>
              <Text style={styles.featureDescription}>
                مشاوره کامل و رایگان در تمام مراحل
              </Text>
            </View>
            <Icon name="chatbubble-outline" size={24} color={colors.accent} />
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>پشتیبانی 24/7</Text>
              <Text style={styles.featureDescription}>
                آماده پاسخگویی در تمام ساعات روز
              </Text>
            </View>
            <Icon name="headset-outline" size={24} color={colors.accent} />
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>قیمت‌های رقابتی</Text>
              <Text style={styles.featureDescription}>
                بهترین قیمت‌ها در بازار املاک
              </Text>
            </View>
            <Icon name="pricetag-outline" size={24} color={colors.accent} />
          </View>
        </View>

        {/* Contact CTA */}
        <View style={[commonStyles.card, styles.ctaCard]}>
          <Text style={commonStyles.subtitle}>آماده همکاری با شما هستیم</Text>
          <Text style={commonStyles.textSecondary}>
            برای مشاوره رایگان و بازدید املاک با ما تماس بگیرید
          </Text>
          
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/contact')}
          >
            <Text style={styles.ctaButtonText}>تماس با ما</Text>
            <Icon name="call-outline" size={20} color={colors.background} />
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
  description: {
    lineHeight: 24,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
  },
  serviceItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  serviceContent: {
    flex: 1,
    marginLeft: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },
  teamMember: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 16,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  memberRole: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
    textAlign: 'right',
  },
  memberExperience: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },
  memberPhone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  featureItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  ctaCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
