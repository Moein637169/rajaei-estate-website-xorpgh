
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Property } from '../types/Property';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

export default function PropertyCard({ property, onPress }: PropertyCardProps) {
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

  return (
    <TouchableOpacity style={commonStyles.propertyCard} onPress={onPress}>
      <Image 
        source={{ uri: property.images[0] }} 
        style={styles.propertyImage}
        resizeMode="cover"
      />
      
      {property.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>ویژه</Text>
        </View>
      )}
      
      <View style={styles.propertyContent}>
        <Text style={commonStyles.subtitle} numberOfLines={2}>
          {property.title}
        </Text>
        
        <Text style={commonStyles.textSecondary} numberOfLines={2}>
          {property.description}
        </Text>
        
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{property.area} متر</Text>
            <Icon name="resize-outline" size={16} color={colors.textSecondary} />
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{property.rooms} اتاق</Text>
            <Icon name="bed-outline" size={16} color={colors.textSecondary} />
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>طبقه {property.floor}</Text>
            <Icon name="business-outline" size={16} color={colors.textSecondary} />
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={commonStyles.priceText}>
            {formatPrice(property.price)}
          </Text>
          
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{property.neighborhood}</Text>
            <Icon name="location-outline" size={14} color={colors.textSecondary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  propertyImage: {
    width: '100%',
    height: 200,
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
  propertyContent: {
    padding: 16,
  },
  propertyDetails: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  detailItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
