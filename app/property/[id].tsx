
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Linking, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import { sampleProperties } from '../../data/properties';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isVisitFormVisible, setIsVisitFormVisible] = useState(false);

  const property = sampleProperties.find(p => p.id === id);

  if (!property) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.errorContainer}>
          <Text style={commonStyles.title}>ملک یافت نشد</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>بازگشت</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (price: number) => {
    const billions = Math.floor(price / 1000000000);
    const millions = Math.floor((price % 1000000000) / 1000000);
    
    if (billions > 0 && millions > 0) {
      return `${billions}.${Math.floor(millions / 100)} میلیارد تومان`;
    } else if (billions > 0) {
      return `${billions} میلیارد تومان`;
    } else {
      return `${Math.floor(price / 1000000)} میلیون تومان`;
    }
  };

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber: string) => {
    const message = `سلام، در مورد ملک "${property.title}" سوال داشتم`;
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${property.title}\n${formatPrice(property.price)}\n${property.address}`,
        title: property.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const calculateLoanAmount = (propertyPrice: number, downPayment: number = 0.3) => {
    const loanAmount = propertyPrice * (1 - downPayment);
    return Math.floor(loanAmount / 1000000);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleShare}>
            <Icon name="share-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>جزئیات ملک</Text>
          
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-forward-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image 
                key={index}
                source={{ uri: image }} 
                style={styles.propertyImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicator}>
            <Text style={styles.imageCounter}>
              {currentImageIndex + 1} / {property.images.length}
            </Text>
          </View>

          {property.isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>ویژه</Text>
            </View>
          )}
        </View>

        {/* Property Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.title}>{property.title}</Text>
          <Text style={commonStyles.priceText}>{formatPrice(property.price)}</Text>
          
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{property.address}</Text>
            <Icon name="location-outline" size={16} color={colors.textSecondary} />
          </View>
          
          <Text style={[commonStyles.textSecondary, styles.description]}>
            {property.description}
          </Text>
        </View>

        {/* Property Details */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>مشخصات ملک</Text>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{property.area} متر</Text>
              <Text style={styles.detailLabel}>متراژ</Text>
              <Icon name="resize-outline" size={20} color={colors.primary} />
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{property.rooms}</Text>
              <Text style={styles.detailLabel}>اتاق خواب</Text>
              <Icon name="bed-outline" size={20} color={colors.primary} />
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{property.bathrooms}</Text>
              <Text style={styles.detailLabel}>سرویس</Text>
              <Icon name="water-outline" size={20} color={colors.primary} />
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>طبقه {property.floor}</Text>
              <Text style={styles.detailLabel}>از {property.totalFloors}</Text>
              <Icon name="business-outline" size={20} color={colors.primary} />
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{property.yearBuilt}</Text>
              <Text style={styles.detailLabel}>سال ساخت</Text>
              <Icon name="calendar-outline" size={20} color={colors.primary} />
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{property.propertyType === 'apartment' ? 'آپارتمان' : 'خانه'}</Text>
              <Text style={styles.detailLabel}>نوع ملک</Text>
              <Icon name="home-outline" size={20} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Features */}
        {property.features.length > 0 && (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>امکانات</Text>
            <View style={styles.featuresContainer}>
              {property.features.map((feature, index) => (
                <View key={index} style={styles.featureChip}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Loan Calculator */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>محاسبه وام</Text>
          <Text style={commonStyles.textSecondary}>
            با پیش پرداخت 30%، مبلغ وام تقریبی: {calculateLoanAmount(property.price)} میلیون تومان
          </Text>
          <Text style={styles.loanNote}>
            * محاسبه تقریبی است و نیاز به بررسی دقیق‌تر دارد
          </Text>
        </View>

        {/* Map Notice */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>موقعیت روی نقشه</Text>
          <View style={styles.mapPlaceholder}>
            <Icon name="map-outline" size={48} color={colors.textSecondary} />
            <Text style={commonStyles.textSecondary}>
              نمایش نقشه در نسخه وب Natively پشتیبانی نمی‌شود
            </Text>
            <Text style={styles.addressText}>{property.address}</Text>
          </View>
        </View>

        {/* Contact Agent */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>مشاور مسئول</Text>
          <View style={styles.agentInfo}>
            <View>
              <Text style={styles.agentName}>{property.contactPerson}</Text>
              <Text style={commonStyles.textSecondary}>مشاور املاک رجایی</Text>
            </View>
            <Icon name="person-circle-outline" size={48} color={colors.primary} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsVisitFormVisible(true)}
        >
          <Text style={styles.actionButtonText}>درخواست بازدید</Text>
          <Icon name="calendar-outline" size={20} color={colors.background} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.contactButton]}
          onPress={() => setIsContactVisible(true)}
        >
          <Text style={styles.actionButtonText}>تماس</Text>
          <Icon name="call-outline" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* Contact Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isContactVisible}
        onClose={() => setIsContactVisible(false)}
      >
        <View style={styles.contactSheet}>
          <Text style={commonStyles.title}>تماس با مشاور</Text>
          
          <TouchableOpacity 
            style={styles.contactOption}
            onPress={() => handleCall(property.contactPhone)}
          >
            <Icon name="call-outline" size={24} color={colors.primary} />
            <Text style={styles.contactOptionText}>تماس تلفنی</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactOption}
            onPress={() => handleWhatsApp(property.contactPhone)}
          >
            <Icon name="logo-whatsapp" size={24} color={colors.secondary} />
            <Text style={styles.contactOptionText}>پیام واتساپ</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>

      {/* Visit Form Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isVisitFormVisible}
        onClose={() => setIsVisitFormVisible(false)}
      >
        <View style={styles.visitSheet}>
          <Text style={commonStyles.title}>درخواست بازدید</Text>
          <Text style={commonStyles.textSecondary}>
            برای هماهنگی بازدید با شماره {property.contactPhone} تماس بگیرید
          </Text>
          
          <TouchableOpacity 
            style={styles.visitButton}
            onPress={() => {
              handleCall(property.contactPhone);
              setIsVisitFormVisible(false);
            }}
          >
            <Text style={styles.visitButtonText}>تماس برای بازدید</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
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
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  propertyImage: {
    width: width - 32,
    height: 250,
    borderRadius: 12,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounter: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.background,
  },
  locationRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginVertical: 8,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    marginTop: 12,
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  detailItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  featuresContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  featureChip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
  },
  loanNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
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
  agentInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  bottomActions: {
    flexDirection: 'row-reverse',
    padding: 16,
    gap: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButton: {
    backgroundColor: colors.secondary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  contactSheet: {
    padding: 16,
  },
  contactOption: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    marginTop: 12,
    gap: 12,
  },
  contactOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  visitSheet: {
    padding: 16,
    alignItems: 'center',
  },
  visitButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  visitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 16,
  },
});
