
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors } from '../styles/commonStyles';
import { sampleProperties, contactInfo } from '../data/properties';
import { PropertyFilter } from '../types/Property';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Icon from '../components/Icon';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredProperties = useMemo(() => {
    let filtered = sampleProperties;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }
    if (filters.minArea) {
      filtered = filtered.filter(property => property.area >= filters.minArea!);
    }
    if (filters.maxArea) {
      filtered = filtered.filter(property => property.area <= filters.maxArea!);
    }
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
    if (filters.neighborhood) {
      filtered = filtered.filter(property => property.neighborhood === filters.neighborhood);
    }
    if (filters.minRooms) {
      filtered = filtered.filter(property => property.rooms >= filters.minRooms!);
    }

    return filtered;
  }, [searchQuery, filters]);

  const featuredProperties = sampleProperties.filter(property => property.isFeatured);

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleCallPress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsAppPress = (phoneNumber: string) => {
    const message = 'سلام، در مورد املاک شما سوال داشتم';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Brand Name */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' }}
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <LinearGradient
              colors={['rgba(46, 125, 50, 0.8)', 'rgba(76, 175, 80, 0.6)']}
              style={styles.heroOverlay}
            >
              <View style={styles.heroContent}>
                <View style={styles.brandContainer}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500', '#FF8C00']}
                    style={styles.brandBackground}
                  >
                    <Text style={styles.brandName}>مشاور املاک رجایی</Text>
                    <Text style={styles.brandSubtitle}>✨ بهترین انتخاب برای خانه رویایی شما ✨</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.heroStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>+100</Text>
                    <Text style={styles.statLabel}>ملک فروخته شده</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>15+</Text>
                    <Text style={styles.statLabel}>سال تجربه</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24/7</Text>
                    <Text style={styles.statLabel}>پشتیبانی</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Navigation Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/admin')} style={styles.headerButton}>
            <Icon name="settings-outline" size={24} color={colors.primary} />
            <Text style={styles.headerButtonText}>مدیریت</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/about')} style={styles.headerButton}>
            <Icon name="information-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.headerButtonText}>درباره ما</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/contact')} style={styles.headerButton}>
            <Icon name="call-outline" size={24} color={colors.primary} />
            <Text style={styles.headerButtonText}>تماس</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchQuery}
          onFilter={setFilters}
          onOpenFilters={() => setIsFilterVisible(true)}
        />

        {/* Quick Contact */}
        <View style={styles.quickContact}>
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={() => handleWhatsAppPress('09145375158')}
          >
            <LinearGradient
              colors={['#25D366', '#128C7E']}
              style={styles.contactButtonGradient}
            >
              <Icon name="logo-whatsapp" size={20} color="white" />
              <Text style={styles.contactButtonText}>مشاوره رایگان در واتساپ</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCallPress('09145375158')}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.contactButtonGradient}
            >
              <Icon name="call" size={20} color="white" />
              <Text style={styles.contactButtonText}>تماس فوری</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>🏠 خدمات ما</Text>
          <View style={styles.servicesGrid}>
            <View style={styles.serviceCard}>
              <Icon name="home-outline" size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>خرید و فروش</Text>
              <Text style={styles.serviceDesc}>مشاوره تخصصی خرید و فروش املاک</Text>
            </View>
            <View style={styles.serviceCard}>
              <Icon name="key-outline" size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>اجاره</Text>
              <Text style={styles.serviceDesc}>اجاره آپارتمان و ویلا</Text>
            </View>
            <View style={styles.serviceCard}>
              <Icon name="calculator-outline" size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>محاسبه وام</Text>
              <Text style={styles.serviceDesc}>محاسبه وام و اقساط</Text>
            </View>
            <View style={styles.serviceCard}>
              <Icon name="document-text-outline" size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>مشاوره حقوقی</Text>
              <Text style={styles.serviceDesc}>انجام کلیه امور حقوقی</Text>
            </View>
          </View>
        </View>

        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={styles.sectionTitle}>⭐ املاک ویژه</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {featuredProperties.map((property) => (
                <View key={property.id} style={styles.featuredCard}>
                  <PropertyCard
                    property={property}
                    onPress={() => handlePropertyPress(property.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Why Choose Us Section */}
        <View style={styles.whyChooseSection}>
          <Text style={styles.sectionTitle}>🌟 چرا ما را انتخاب کنید؟</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>15 سال تجربه در بازار املاک اردبیل</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>مشاوره رایگان و تخصصی</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>پشتیبانی 24 ساعته</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>قیمت‌های منصفانه و رقابتی</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.benefitText}>انجام کلیه امور حقوقی</Text>
            </View>
          </View>
        </View>

        {/* All Properties */}
        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.push('/properties')}>
              <Text style={styles.seeAllText}>مشاهده همه</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>
              🏢 همه املاک ({filteredProperties.length})
            </Text>
          </View>
          
          {filteredProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
            />
          ))}
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>💬 نظرات مشتریان</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "خدمات عالی و مشاوره دقیق. خانه رویایی‌ام را پیدا کردم!"
              </Text>
              <Text style={styles.testimonialAuthor}>- احمد محمدی</Text>
              <View style={styles.stars}>
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="star" size={16} color="#FFD700" />
                ))}
              </View>
            </View>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "تیم حرفه‌ای و قابل اعتماد. پیشنهاد می‌کنم!"
              </Text>
              <Text style={styles.testimonialAuthor}>- فاطمه رضایی</Text>
              <View style={styles.stars}>
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="star" size={16} color="#FFD700" />
                ))}
              </View>
            </View>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "فروش سریع و با بهترین قیمت. ممنون از تیم رجایی"
              </Text>
              <Text style={styles.testimonialAuthor}>- علی اکبری</Text>
              <View style={styles.stars}>
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="star" size={16} color="#FFD700" />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Contact Info */}
        <View style={[commonStyles.card, styles.contactCard]}>
          <Text style={styles.sectionTitle}>📞 اطلاعات تماس</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Icon name="location-outline" size={20} color={colors.primary} />
              <Text style={styles.contactText}>{contactInfo.address}</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="time-outline" size={20} color={colors.primary} />
              <Text style={styles.contactText}>ساعات کاری: {contactInfo.workingHours}</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="mail-outline" size={20} color={colors.primary} />
              <Text style={styles.contactText}>{contactInfo.email}</Text>
            </View>
          </View>
          
          <View style={styles.phoneList}>
            {contactInfo.phones.map((phone, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.phoneItem}
                onPress={() => handleCallPress(phone.number)}
              >
                <Icon name="call-outline" size={16} color={colors.primary} />
                <Text style={styles.phoneText}>{phone.number} - {phone.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 مشاور املاک رجایی - تمامی حقوق محفوظ است
          </Text>
          <Text style={styles.footerSubtext}>
            بهترین انتخاب برای خرید، فروش و اجاره املاک در اردبیل
          </Text>
        </View>
      </ScrollView>

      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    height: 300,
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 20,
  },
  heroBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  brandContainer: {
    marginBottom: 30,
  },
  brandBackground: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E2E2E',
    textAlign: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  headerButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  quickContact: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  whatsappButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  callButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  servicesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'right',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: (width - 48) / 2,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  whyChooseSection: {
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  horizontalScroll: {
    marginTop: 8,
  },
  featuredCard: {
    width: 280,
    marginLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  testimonialsSection: {
    marginBottom: 24,
  },
  testimonialCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginLeft: 12,
    width: 250,
    borderWidth: 1,
    borderColor: colors.border,
  },
  testimonialText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'right',
  },
  testimonialAuthor: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row-reverse',
    gap: 2,
  },
  contactCard: {
    marginTop: 16,
    marginBottom: 32,
  },
  contactInfo: {
    marginBottom: 16,
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  phoneList: {
    marginTop: 12,
    gap: 8,
  },
  phoneItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
  },
  phoneText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
