
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { sampleProperties, contactInfo } from '../data/properties';
import { PropertyFilter } from '../types/Property';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Icon from '../components/Icon';

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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Icon name="information-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={commonStyles.title}>مشاور املاک رجایی</Text>
            <Text style={commonStyles.textSecondary}>اردبیل، شهرک کوثر</Text>
          </View>
          
          <TouchableOpacity onPress={() => router.push('/contact')}>
            <Icon name="call-outline" size={24} color={colors.primary} />
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
            style={styles.contactButton}
            onPress={() => handleWhatsAppPress('09145375158')}
          >
            <Text style={styles.contactButtonText}>واتساپ</Text>
            <Icon name="logo-whatsapp" size={20} color={colors.background} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.contactButton, styles.callButton]}
            onPress={() => handleCallPress('09145375158')}
          >
            <Text style={styles.contactButtonText}>تماس فوری</Text>
            <Icon name="call" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>املاک ویژه</Text>
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

        {/* All Properties */}
        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.push('/properties')}>
              <Text style={styles.seeAllText}>مشاهده همه</Text>
            </TouchableOpacity>
            <Text style={commonStyles.subtitle}>
              همه املاک ({filteredProperties.length})
            </Text>
          </View>
          
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
            />
          ))}
        </View>

        {/* Contact Info */}
        <View style={[commonStyles.card, styles.contactCard]}>
          <Text style={commonStyles.subtitle}>اطلاعات تماس</Text>
          <Text style={commonStyles.textSecondary}>{contactInfo.address}</Text>
          <Text style={commonStyles.textSecondary}>ساعات کاری: {contactInfo.workingHours}</Text>
          
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
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  quickContact: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginBottom: 16,
  },
  contactButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    backgroundColor: colors.primary,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
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
  contactCard: {
    marginTop: 16,
    marginBottom: 32,
  },
  phoneList: {
    marginTop: 12,
    gap: 8,
  },
  phoneItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  phoneText: {
    fontSize: 14,
    color: colors.text,
  },
});
