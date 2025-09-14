
import { Property } from '../types/Property';

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'آپارتمان لوکس در شهرک کوثر',
    description: 'آپارتمان 96 متری با امکانات کامل در بهترین منطقه شهرک کوثر',
    price: 3200000000,
    area: 96,
    rooms: 2,
    bathrooms: 1,
    floor: 3,
    totalFloors: 5,
    yearBuilt: 1396,
    address: 'اردبیل، شهرک کوثر، آسمان',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    features: ['پارکینگ', 'انباری', 'آسانسور', 'بالکن', 'کابینت MDF'],
    coordinates: {
      latitude: 38.2498,
      longitude: 48.2933
    },
    contactPerson: 'حسام رجایی',
    contactPhone: '09145375158',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    isFeatured: true
  },
  {
    id: '2',
    title: 'آپارتمان نوساز بلوک 7',
    description: 'آپارتمان 100 متری نوساز با کیفیت عالی ساخت',
    price: 3700000000,
    area: 100,
    rooms: 2,
    bathrooms: 1,
    floor: 1,
    totalFloors: 4,
    yearBuilt: 1404,
    address: 'اردبیل، شهرک کوثر، بلوک 7',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
    ],
    features: ['پارکینگ', 'انباری', 'آسانسور', 'نوساز', 'کف سرامیک'],
    coordinates: {
      latitude: 38.2510,
      longitude: 48.2945
    },
    contactPerson: 'عباس رجایی',
    contactPhone: '09143515158',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    isFeatured: true
  },
  {
    id: '3',
    title: 'آپارتمان طبقه دوم بلوک 7',
    description: 'آپارتمان 100 متری طبقه دوم با نور عالی',
    price: 3900000000,
    area: 100,
    rooms: 2,
    bathrooms: 1,
    floor: 2,
    totalFloors: 4,
    yearBuilt: 1404,
    address: 'اردبیل، شهرک کوثر، بلوک 7',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    features: ['پارکینگ', 'انباری', 'آسانسور', 'نوساز', 'نور عالی'],
    contactPerson: 'حمید رجایی',
    contactPhone: '09144567044',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    isFeatured: false
  },
  {
    id: '4',
    title: 'آپارتمان بلوک 14',
    description: 'آپارتمان 105 متری با امکانات کامل',
    price: 3850000000,
    area: 105,
    rooms: 3,
    bathrooms: 2,
    floor: 2,
    totalFloors: 5,
    yearBuilt: 1396,
    address: 'اردبیل، شهرک کوثر، بلوک 14',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    features: ['پارکینگ', 'انباری', 'آسانسور', 'کابینت MDF', 'کمد دیواری'],
    contactPerson: 'حسام رجایی',
    contactPhone: '09145375158',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    isFeatured: false
  },
  {
    id: '5',
    title: 'آپارتمان اقتصادی 88 متری',
    description: 'آپارتمان مناسب برای خانواده‌های جوان',
    price: 2100000000,
    area: 88,
    rooms: 2,
    bathrooms: 1,
    floor: 1,
    totalFloors: 3,
    yearBuilt: 1395,
    address: 'اردبیل، شهرک کوثر',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    features: ['پارکینگ', 'کابینت MDF'],
    contactPerson: 'عباس رجایی',
    contactPhone: '09143515158',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    isFeatured: false
  },
  {
    id: '6',
    title: 'آپارتمان لوکس 120 متری',
    description: 'آپارتمان بزرگ و لوکس با امکانات کامل',
    price: 4200000000,
    area: 120,
    rooms: 3,
    bathrooms: 2,
    floor: 3,
    totalFloors: 4,
    yearBuilt: 1400,
    address: 'اردبیل، شهرک کوثر',
    neighborhood: 'شهرک کوثر',
    propertyType: 'apartment',
    status: 'for_sale',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    features: ['پارکینگ', 'انباری', 'آسانسور', 'جکوزی', 'کابینت های گلاس'],
    contactPerson: 'حمید رجایی',
    contactPhone: '09144567044',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFeatured: true
  }
];

export const contactInfo = {
  name: 'مشاور املاک رجایی',
  address: 'اردبیل، شهرک کوثر، بلوک ۷، قطعه ۱۲۷',
  email: 'Amlakerajaei127@gmail.com',
  workingHours: 'صبح تا شب ۲۰:۰۰',
  phones: [
    { name: 'حسام رجایی', number: '09145375158' },
    { name: 'عباس رجایی', number: '09143515158' },
    { name: 'حمید رجایی', number: '09144567044' }
  ]
};
