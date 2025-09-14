
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  address: string;
  neighborhood: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'for_sale' | 'for_rent' | 'sold' | 'rented';
  images: string[];
  features: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  contactPerson: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  propertyType?: string;
  neighborhood?: string;
  minRooms?: number;
  status?: string;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
}
