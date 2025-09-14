
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { PropertyFilter } from '../types/Property';
import Icon from './Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: PropertyFilter) => void;
  onOpenFilters: () => void;
}

export default function SearchBar({ onSearch, onFilter, onOpenFilters }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={commonStyles.searchContainer}>
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.filterButton} onPress={onOpenFilters}>
          <Icon name="options-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search-outline" size={20} color={colors.background} />
        </TouchableOpacity>
        
        <TextInput
          style={[commonStyles.input, styles.searchInput]}
          placeholder="جستجو در املاک..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  searchButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: colors.backgroundAlt,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
