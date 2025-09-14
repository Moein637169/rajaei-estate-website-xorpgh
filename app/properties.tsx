
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { sampleProperties } from '../data/properties';
import { PropertyFilter } from '../types/Property';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Icon from '../components/Icon';

type SortOption = 'newest' | 'price_low' | 'price_high' | 'area_low' | 'area_high';

export default function PropertiesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortOptions = [
    { key: 'newest', label: 'جدیدترین' },
    { key: 'price_low', label: 'ارزان‌ترین' },
    { key: 'price_high', label: 'گران‌ترین' },
    { key: 'area_low', label: 'کوچک‌ترین' },
    { key: 'area_high', label: 'بزرگ‌ترین' },
  ];

  const filteredAndSortedProperties = useMemo(() => {
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

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'area_low':
          return a.area - b.area;
        case 'area_high':
          return b.area - a.area;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, filters, sortBy]);

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-forward-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>همه املاک</Text>
          
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchQuery}
          onFilter={setFilters}
          onOpenFilters={() => setIsFilterVisible(true)}
        />

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortChip,
                  sortBy === option.key && styles.sortChipSelected
                ]}
                onPress={() => setSortBy(option.key as SortOption)}
              >
                <Text style={[
                  styles.sortChipText,
                  sortBy === option.key && styles.sortChipTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={commonStyles.textSecondary}>
            {filteredAndSortedProperties.length} ملک یافت شد
          </Text>
        </View>

        {/* Properties List */}
        {filteredAndSortedProperties.length > 0 ? (
          filteredAndSortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="home-outline" size={64} color={colors.textSecondary} />
            <Text style={commonStyles.subtitle}>هیچ ملکی یافت نشد</Text>
            <Text style={commonStyles.textSecondary}>
              لطفاً فیلترها را تغییر دهید یا جستجوی جدیدی انجام دهید
            </Text>
          </View>
        )}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  sortContainer: {
    marginBottom: 16,
  },
  sortChip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortChipText: {
    fontSize: 14,
    color: colors.text,
  },
  sortChipTextSelected: {
    color: colors.background,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
});
