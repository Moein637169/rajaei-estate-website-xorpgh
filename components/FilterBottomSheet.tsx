
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { PropertyFilter } from '../types/Property';
import SimpleBottomSheet from './BottomSheet';

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: PropertyFilter) => void;
  currentFilters: PropertyFilter;
}

export default function FilterBottomSheet({ 
  isVisible, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterBottomSheetProps) {
  const [filters, setFilters] = useState<PropertyFilter>(currentFilters);

  const propertyTypes = [
    { key: 'apartment', label: 'آپارتمان' },
    { key: 'house', label: 'خانه' },
    { key: 'commercial', label: 'تجاری' },
    { key: 'land', label: 'زمین' }
  ];

  const neighborhoods = [
    'شهرک کوثر',
    'مرکز شهر',
    'شهرک صنعتی',
    'بلوار امام'
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <ScrollView style={styles.container}>
        <Text style={commonStyles.title}>فیلتر املاک</Text>
        
        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>محدوده قیمت (میلیون تومان)</Text>
          <View style={styles.row}>
            <TextInput
              style={[commonStyles.input, styles.halfInput]}
              placeholder="حداکثر"
              value={filters.maxPrice ? (filters.maxPrice / 1000000).toString() : ''}
              onChangeText={(text) => setFilters({
                ...filters,
                maxPrice: text ? parseInt(text) * 1000000 : undefined
              })}
              keyboardType="numeric"
            />
            <TextInput
              style={[commonStyles.input, styles.halfInput]}
              placeholder="حداقل"
              value={filters.minPrice ? (filters.minPrice / 1000000).toString() : ''}
              onChangeText={(text) => setFilters({
                ...filters,
                minPrice: text ? parseInt(text) * 1000000 : undefined
              })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Area Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>محدوده متراژ</Text>
          <View style={styles.row}>
            <TextInput
              style={[commonStyles.input, styles.halfInput]}
              placeholder="حداکثر"
              value={filters.maxArea?.toString() || ''}
              onChangeText={(text) => setFilters({
                ...filters,
                maxArea: text ? parseInt(text) : undefined
              })}
              keyboardType="numeric"
            />
            <TextInput
              style={[commonStyles.input, styles.halfInput]}
              placeholder="حداقل"
              value={filters.minArea?.toString() || ''}
              onChangeText={(text) => setFilters({
                ...filters,
                minArea: text ? parseInt(text) : undefined
              })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>نوع ملک</Text>
          <View style={styles.chipContainer}>
            {propertyTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.chip,
                  filters.propertyType === type.key && styles.chipSelected
                ]}
                onPress={() => setFilters({
                  ...filters,
                  propertyType: filters.propertyType === type.key ? undefined : type.key
                })}
              >
                <Text style={[
                  styles.chipText,
                  filters.propertyType === type.key && styles.chipTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Neighborhood */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>محله</Text>
          <View style={styles.chipContainer}>
            {neighborhoods.map((neighborhood) => (
              <TouchableOpacity
                key={neighborhood}
                style={[
                  styles.chip,
                  filters.neighborhood === neighborhood && styles.chipSelected
                ]}
                onPress={() => setFilters({
                  ...filters,
                  neighborhood: filters.neighborhood === neighborhood ? undefined : neighborhood
                })}
              >
                <Text style={[
                  styles.chipText,
                  filters.neighborhood === neighborhood && styles.chipTextSelected
                ]}>
                  {neighborhood}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rooms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>حداقل تعداد اتاق</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="تعداد اتاق"
            value={filters.minRooms?.toString() || ''}
            onChangeText={(text) => setFilters({
              ...filters,
              minRooms: text ? parseInt(text) : undefined
            })}
            keyboardType="numeric"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={buttonStyles.primary} onPress={handleApply}>
            <Text style={styles.buttonText}>اعمال فیلتر</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={buttonStyles.outline} onPress={handleReset}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>پاک کردن</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row-reverse',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.background,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
