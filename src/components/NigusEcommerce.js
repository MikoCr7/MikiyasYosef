import React, { useState } from 'react';
import './NigusEcommerce.css';

const NigusEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState(5);
  const [messages, setMessages] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showMyAds, setShowMyAds] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All Ethiopia');
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellForm, setSellForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'all',
    condition: 'New',
    location: 'Addis Ababa',
    image: ''
  });

  const categories = [
    { id: 'vehicles', name: 'Vehicles', icon: 'fas fa-car', count: 17287 },
    { id: 'property', name: 'Property', icon: 'fas fa-home', count: 19396 },
    { id: 'mobile', name: 'Mobile Phones & Tablets', icon: 'fas fa-mobile-alt', count: 35338 },
    { id: 'electronics', name: 'Electronics', icon: 'fas fa-laptop', count: 355655 },
    { id: 'home', name: 'Home, Furniture & Appliances', icon: 'fas fa-couch', count: 57340 },
    { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt', count: 39713 },
    { id: 'beauty', name: 'Beauty & Personal Care', icon: 'fas fa-palette', count: 36380 },
    { id: 'services', name: 'Services', icon: 'fas fa-wrench', count: 2431 },
    { id: 'repair', name: 'Repair & Construction', icon: 'fas fa-hard-hat', count: 12302 },
    { id: 'sports', name: 'Sports & Outdoors', icon: 'fas fa-football-ball', count: 15234 },
    { id: 'books', name: 'Books & Media', icon: 'fas fa-book', count: 8765 },
    { id: 'toys', name: 'Toys & Games', icon: 'fas fa-gamepad', count: 11234 },
    { id: 'pets', name: 'Pets & Animals', icon: 'fas fa-paw', count: 5432 },
    { id: 'food', name: 'Food & Beverages', icon: 'fas fa-utensils', count: 9876 },
    { id: 'health', name: 'Health & Fitness', icon: 'fas fa-dumbbell', count: 7654 },
    { id: 'baby', name: 'Baby Products', icon: 'fas fa-baby', count: 4321 },
    { id: 'office', name: 'Office Supplies', icon: 'fas fa-briefcase', count: 6543 },
    { id: 'garden', name: 'Garden & Tools', icon: 'fas fa-seedling', count: 3456 },
    { id: 'music', name: 'Musical Instruments', icon: 'fas fa-guitar', count: 2345 },
    { id: 'art', name: 'Art & Collectibles', icon: 'fas fa-paint-brush', count: 1234 },
    { id: 'jewelry', name: 'Jewelry & Watches', icon: 'fas fa-gem', count: 8765 },
    { id: 'cameras', name: 'Cameras & Photography', icon: 'fas fa-camera', count: 5432 },
    { id: 'computers', name: 'Computers & Accessories', icon: 'fas fa-desktop', count: 23456 },
    { id: 'audio', name: 'Audio & Video Equipment', icon: 'fas fa-headphones', count: 9876 },
    { id: 'bikes', name: 'Bicycles & Motorcycles', icon: 'fas fa-bicycle', count: 6543 },
    { id: 'tickets', name: 'Tickets & Vouchers', icon: 'fas fa-ticket-alt', count: 4321 },
    { id: 'jobs', name: 'Jobs & Career', icon: 'fas fa-briefcase', count: 12345 },
    { id: 'education', name: 'Education & Training', icon: 'fas fa-graduation-cap', count: 5432 },
    { id: 'travel', name: 'Travel & Tourism', icon: 'fas fa-plane', count: 3456 },
    { id: 'events', name: 'Events & Entertainment', icon: 'fas fa-calendar-alt', count: 2345 }
  ];

  const products = [
    // Mobile Phones & Tablets (8 products)
    {
      id: 1,
      title: 'Motorola One Macro 64 GB Black',
      price: 9500,
      description: 'Motorola One Macro for Sale! Storage: 64GB RAM: 4GB Camera: Triple AI Camera - captures clear photos in any light',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      location: 'Addis Ababa, Kolfe Keranio',
      condition: 'Used',
      seller: 'Pedros Habtaml',
      category: 'mobile'
    },
    {
      id: 2,
      title: 'New Xiaomi Redmi Note 9 Pro 128 GB',
      price: 16500,
      description: 'Redmi Note 9 Pro • 6.67" FHD+ Display • Snapdragon 720G - Smooth performance for gaming & multitasking',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Dot-Tech',
      category: 'mobile'
    },
    {
      id: 3,
      title: 'Apple iPhone 12 Pro Max 256 GB Blue',
      price: 27000,
      description: 'Screen fesual ena Face ID ayseram. Perfect condition except minor scratches',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      location: 'Addis Ababa, Nifas Silk-Lafto',
      condition: 'Used',
      seller: 'Salim Abdu',
      category: 'mobile'
    },
    {
      id: 4,
      title: 'New Apple iPhone 15 Pro 128 GB Black',
      price: 54999,
      description: 'Sim locked but everything works perfectly. Brand new condition with all accessories',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Locked',
      seller: 'Yeabtsega Nigusse',
      category: 'mobile'
    },
    {
      id: 5,
      title: 'Samsung Galaxy S21 Ultra 256 GB',
      price: 32000,
      description: 'Premium flagship phone with 108MP camera and 8K video recording',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Tech Store',
      category: 'mobile'
    },
    {
      id: 6,
      title: 'OnePlus 9 Pro 128 GB',
      price: 28000,
      description: 'Fast charging, 120Hz display, and Hasselblad camera system',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'New',
      seller: 'Mobile Hub',
      category: 'mobile'
    },
    {
      id: 7,
      title: 'Google Pixel 6 Pro 128 GB',
      price: 25000,
      description: 'Best camera phone with Google AI features and pure Android experience',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Pixel Store',
      category: 'mobile'
    },
    {
      id: 8,
      title: 'Huawei P50 Pro 256 GB',
      price: 30000,
      description: 'Leica triple camera system with 50MP main sensor',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Huawei Official',
      category: 'mobile'
    },
    // Vehicles (2 products)
    {
      id: 9,
      title: 'Toyota Corolla 2018 - Excellent Condition',
      price: 450000,
      description: 'Well maintained Toyota Corolla, full service history, low mileage',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Auto Dealer',
      category: 'vehicles'
    },
    {
      id: 10,
      title: 'Honda Civic 2020 - Like New',
      price: 680000,
      description: 'One owner, garage kept, all original parts',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Car World',
      category: 'vehicles'
    },
    // Property (2 products)
    {
      id: 11,
      title: '3 Bedroom Apartment in Bole',
      price: 2500000,
      description: 'Modern 3BR apartment, fully furnished, great location near airport',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Real Estate Co',
      category: 'property'
    },
    {
      id: 12,
      title: 'Commercial Shop Space - Piassa',
      price: 1200000,
      description: 'Prime location commercial space, ready for business',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'Used',
      seller: 'Property Solutions',
      category: 'property'
    },
    // Electronics (2 products)
    {
      id: 13,
      title: 'MacBook Pro 13" M1 Chip - 512GB',
      price: 85000,
      description: '2021 MacBook Pro with M1 chip, excellent condition',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Tech Hub',
      category: 'electronics'
    },
    {
      id: 14,
      title: 'Sony 65" 4K Smart TV',
      price: 45000,
      description: 'Sony Bravia 65 inch 4K UHD Smart TV, wall mountable',
      image: 'https://images.unsplash.com/photo-1593359677879-a4b92a0a3b0b?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Electro Store',
      category: 'electronics'
    },
    // Home, Furniture & Appliances (2 products)
    {
      id: 15,
      title: 'Modern Sofa Set - 3 Seater',
      price: 18000,
      description: 'Comfortable modern sofa set, gray color, perfect for living room',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      location: 'Addis Ababa, Nifas Silk-Lafto',
      condition: 'Used',
      seller: 'Furniture Plus',
      category: 'home'
    },
    {
      id: 16,
      title: 'Refrigerator - Samsung 300L',
      price: 22000,
      description: 'Energy efficient Samsung refrigerator, perfect condition',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Home Appliances',
      category: 'home'
    },
    // Fashion (2 products)
    {
      id: 17,
      title: 'Designer Leather Jacket - Size M',
      price: 3500,
      description: 'Genuine leather jacket, excellent quality, like new condition',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'Used',
      seller: 'Fashion Store',
      category: 'fashion'
    },
    {
      id: 18,
      title: 'Nike Air Max Shoes - Size 42',
      price: 2800,
      description: 'Authentic Nike Air Max, comfortable and stylish',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Shoe Palace',
      category: 'fashion'
    },
    // Beauty & Personal Care (2 products)
    {
      id: 19,
      title: 'Premium Skincare Set',
      price: 1200,
      description: 'Complete skincare routine set, brand new, unopened',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'New',
      seller: 'Beauty Corner',
      category: 'beauty'
    },
    {
      id: 20,
      title: 'Professional Hair Dryer',
      price: 850,
      description: 'High quality hair dryer with multiple heat settings',
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Beauty Essentials',
      category: 'beauty'
    },
    // Services (2 products)
    {
      id: 21,
      title: 'Professional Photography Services',
      price: 5000,
      description: 'Wedding, event, and portrait photography services',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Photo Pro',
      category: 'services'
    },
    {
      id: 22,
      title: 'Home Cleaning Service',
      price: 800,
      description: 'Professional home and office cleaning services',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Clean Pro',
      category: 'services'
    },
    // Repair & Construction (2 products)
    {
      id: 23,
      title: 'Power Drill Set - Professional',
      price: 3500,
      description: 'Complete power drill set with multiple drill bits',
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3d32?w=400',
      location: 'Addis Ababa, Kolfe Keranio',
      condition: 'Used',
      seller: 'Tool Shop',
      category: 'repair'
    },
    {
      id: 24,
      title: 'Construction Materials Package',
      price: 15000,
      description: 'Cement, sand, and gravel package for construction',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Build Materials',
      category: 'repair'
    },
    // Sports & Outdoors (2 products)
    {
      id: 25,
      title: 'Football - Adidas Official',
      price: 1200,
      description: 'Official Adidas football, perfect for training and matches',
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Sports Zone',
      category: 'sports'
    },
    {
      id: 26,
      title: 'Yoga Mat - Premium Quality',
      price: 800,
      description: 'Non-slip yoga mat with carrying strap',
      image: 'https://images.unsplash.com/photo-1506126613408-ec07acdee4e1?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'New',
      seller: 'Fitness Store',
      category: 'sports'
    },
    // Books & Media (2 products)
    {
      id: 27,
      title: 'Programming Books Collection',
      price: 1500,
      description: 'Set of programming books: JavaScript, Python, React',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'Used',
      seller: 'Book Store',
      category: 'books'
    },
    {
      id: 28,
      title: 'Bluetooth Speaker - JBL',
      price: 2500,
      description: 'Portable JBL speaker with excellent sound quality',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Media Store',
      category: 'books'
    },
    // Toys & Games (2 products)
    {
      id: 29,
      title: 'PS5 Gaming Console',
      price: 45000,
      description: 'PlayStation 5 console with controller and games',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Game World',
      category: 'toys'
    },
    {
      id: 30,
      title: 'Board Games Collection',
      price: 1200,
      description: 'Monopoly, Chess, and other classic board games',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Toy Store',
      category: 'toys'
    },
    // Pets & Animals (2 products)
    {
      id: 31,
      title: 'Dog Food - Premium Brand',
      price: 800,
      description: 'High quality dog food, 20kg bag',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Pet Store',
      category: 'pets'
    },
    {
      id: 32,
      title: 'Cat Litter Box & Accessories',
      price: 600,
      description: 'Complete cat litter setup with accessories',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      location: 'Addis Ababa, Nifas Silk-Lafto',
      condition: 'New',
      seller: 'Pet Supplies',
      category: 'pets'
    },
    // Food & Beverages (2 products)
    {
      id: 33,
      title: 'Premium Coffee Beans - 1kg',
      price: 450,
      description: 'Ethiopian specialty coffee beans, freshly roasted',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Coffee Shop',
      category: 'food'
    },
    {
      id: 34,
      title: 'Honey - Pure Natural',
      price: 350,
      description: 'Pure natural honey, 1kg jar',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Natural Foods',
      category: 'food'
    },
    // Health & Fitness (2 products)
    {
      id: 35,
      title: 'Dumbbell Set - 20kg',
      price: 2500,
      description: 'Adjustable dumbbell set for home workout',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Fitness Equipment',
      category: 'health'
    },
    {
      id: 36,
      title: 'Protein Powder - 2kg',
      price: 1800,
      description: 'Whey protein powder, chocolate flavor',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Nutrition Store',
      category: 'health'
    },
    // Baby Products (2 products)
    {
      id: 37,
      title: 'Baby Stroller - 3-in-1',
      price: 3500,
      description: 'Convertible baby stroller with car seat',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Baby Store',
      category: 'baby'
    },
    {
      id: 38,
      title: 'Baby Clothes Set - 0-6 months',
      price: 500,
      description: 'Complete baby clothes set, various sizes',
      image: 'https://images.unsplash.com/photo-1503341338985-b0475e0d8ac0?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'New',
      seller: 'Baby Fashion',
      category: 'baby'
    },
    // Office Supplies (2 products)
    {
      id: 39,
      title: 'Office Desk - Modern Design',
      price: 4200,
      description: 'Ergonomic office desk with drawers',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Office Furniture',
      category: 'office'
    },
    {
      id: 40,
      title: 'Printer - HP LaserJet',
      price: 6500,
      description: 'HP LaserJet printer, wireless connectivity',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Office Equipment',
      category: 'office'
    },
    // Garden & Tools (2 products)
    {
      id: 41,
      title: 'Garden Tool Set',
      price: 1200,
      description: 'Complete gardening tool set with shovel, rake, and more',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      location: 'Addis Ababa, Kolfe Keranio',
      condition: 'Used',
      seller: 'Garden Store',
      category: 'garden'
    },
    {
      id: 42,
      title: 'Plant Seeds Collection',
      price: 300,
      description: 'Variety pack of vegetable and flower seeds',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Garden Center',
      category: 'garden'
    },
    // Musical Instruments (2 products)
    {
      id: 43,
      title: 'Acoustic Guitar - Yamaha',
      price: 8500,
      description: 'Professional acoustic guitar, excellent sound quality',
      image: 'https://images.unsplash.com/photo-1516924962500-2b4b2b8a6d90?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Music Store',
      category: 'music'
    },
    {
      id: 44,
      title: 'Keyboard Piano - 61 Keys',
      price: 12000,
      description: 'Electronic keyboard with multiple sounds and rhythms',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Instruments Pro',
      category: 'music'
    },
    // Art & Collectibles (2 products)
    {
      id: 45,
      title: 'Ethiopian Art Painting',
      price: 2500,
      description: 'Original Ethiopian traditional art painting',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      location: 'Addis Ababa, Piassa',
      condition: 'Used',
      seller: 'Art Gallery',
      category: 'art'
    },
    {
      id: 46,
      title: 'Antique Coin Collection',
      price: 5000,
      description: 'Rare Ethiopian antique coins collection',
      image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Collectibles Shop',
      category: 'art'
    },
    // Jewelry & Watches (2 products)
    {
      id: 47,
      title: 'Gold Necklace - 18k',
      price: 15000,
      description: 'Beautiful 18k gold necklace, elegant design',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Jewelry Store',
      category: 'jewelry'
    },
    {
      id: 48,
      title: 'Smart Watch - Apple Watch',
      price: 18000,
      description: 'Apple Watch Series 7, GPS enabled',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'Used',
      seller: 'Watch Store',
      category: 'jewelry'
    },
    // Cameras & Photography (2 products)
    {
      id: 49,
      title: 'DSLR Camera - Canon EOS',
      price: 25000,
      description: 'Canon EOS DSLR camera with lens kit',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Camera World',
      category: 'cameras'
    },
    {
      id: 50,
      title: 'Camera Tripod - Professional',
      price: 1800,
      description: 'Professional camera tripod with adjustable height',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'New',
      seller: 'Photo Equipment',
      category: 'cameras'
    },
    // Computers & Accessories (2 products)
    {
      id: 51,
      title: 'Gaming Laptop - ASUS ROG',
      price: 55000,
      description: 'ASUS ROG gaming laptop, high performance',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Computer Store',
      category: 'computers'
    },
    {
      id: 52,
      title: 'Mechanical Keyboard - RGB',
      price: 3200,
      description: 'RGB mechanical gaming keyboard with backlight',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      location: 'Addis Ababa, Kazanchis',
      condition: 'New',
      seller: 'PC Accessories',
      category: 'computers'
    },
    // Audio & Video Equipment (2 products)
    {
      id: 53,
      title: 'Home Theater System',
      price: 12000,
      description: '5.1 surround sound home theater system',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Audio Store',
      category: 'audio'
    },
    {
      id: 54,
      title: 'Wireless Headphones - Sony',
      price: 4500,
      description: 'Sony WH-1000XM4 noise cancelling headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'Used',
      seller: 'Audio Pro',
      category: 'audio'
    },
    // Bicycles & Motorcycles (2 products)
    {
      id: 55,
      title: 'Mountain Bike - 21 Speed',
      price: 8500,
      description: 'Professional mountain bike, excellent condition',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
      location: 'Addis Ababa, Kolfe Keranio',
      condition: 'Used',
      seller: 'Bike Shop',
      category: 'bikes'
    },
    {
      id: 56,
      title: 'Motorcycle - 150cc',
      price: 45000,
      description: 'Honda 150cc motorcycle, well maintained',
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'Used',
      seller: 'Motorcycle Dealer',
      category: 'bikes'
    },
    // Tickets & Vouchers (2 products)
    {
      id: 57,
      title: 'Concert Tickets - 2 Tickets',
      price: 800,
      description: 'Two tickets for upcoming concert event',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Ticket Sales',
      category: 'tickets'
    },
    {
      id: 58,
      title: 'Restaurant Voucher - 500 ETB',
      price: 400,
      description: 'Gift voucher for fine dining restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Voucher Shop',
      category: 'tickets'
    },
    // Jobs & Career (2 products)
    {
      id: 59,
      title: 'Software Developer Position',
      price: 0,
      description: 'Full-time software developer job opportunity',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Tech Company',
      category: 'jobs'
    },
    {
      id: 60,
      title: 'Marketing Manager Job',
      price: 0,
      description: 'Marketing manager position, competitive salary',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      location: 'Addis Ababa, CMC',
      condition: 'New',
      seller: 'Marketing Firm',
      category: 'jobs'
    },
    // Education & Training (2 products)
    {
      id: 61,
      title: 'Online Programming Course',
      price: 2500,
      description: 'Complete web development course, 6 months program',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      location: 'Addis Ababa, Online',
      condition: 'New',
      seller: 'Education Center',
      category: 'education'
    },
    {
      id: 62,
      title: 'Language Learning Course',
      price: 1800,
      description: 'English language course with certificate',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Language School',
      category: 'education'
    },
    // Travel & Tourism (2 products)
    {
      id: 63,
      title: 'Tour Package - Lalibela',
      price: 5000,
      description: '3-day tour package to Lalibela, includes accommodation',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
      location: 'Addis Ababa, Bole',
      condition: 'New',
      seller: 'Travel Agency',
      category: 'travel'
    },
    {
      id: 64,
      title: 'Hotel Booking Voucher',
      price: 2500,
      description: 'Hotel stay voucher for 2 nights, any hotel',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Travel Services',
      category: 'travel'
    },
    // Events & Entertainment (2 products)
    {
      id: 65,
      title: 'Event Planning Services',
      price: 8000,
      description: 'Complete event planning for weddings, parties',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Event Planner',
      category: 'events'
    },
    {
      id: 66,
      title: 'DJ Services Package',
      price: 3500,
      description: 'Professional DJ services for events and parties',
      image: 'https://images.unsplash.com/photo-1571332655065-7e006353e5a0?w=400',
      location: 'Addis Ababa, All Areas',
      condition: 'New',
      seller: 'Entertainment Services',
      category: 'events'
    }
  ];

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const searchedProducts = searchQuery 
    ? filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowCart(true);
    // Auto close cart after 2 seconds
    setTimeout(() => setShowCart(false), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item, index) => {
      const itemIndex = cart.findIndex(p => p.id === productId);
      return index !== itemIndex;
    }));
  };

  const toggleBookmark = (product) => {
    if (bookmarks.find(b => b.id === product.id)) {
      setBookmarks(bookmarks.filter(b => b.id !== product.id));
    } else {
      setBookmarks([...bookmarks, product]);
    }
  };

  const isBookmarked = (productId) => {
    return bookmarks.some(b => b.id === productId);
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  const clearMessages = () => {
    setMessages(0);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price) => {
    return `ETB ${price.toLocaleString()}`;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-action-item')) {
        setShowBookmarks(false);
        setShowMessages(false);
        setShowNotifications(false);
        setShowAccount(false);
        setShowMyAds(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="nigus-ecommerce">
      {/* Header */}
      <header className="nigus-header">
        <div className="header-top">
          <div className="header-content">
                      <div className="logo">
                        <i className="fas fa-crown" style={{ fontSize: '1.2rem', color: '#ffffff', marginRight: '0.5rem' }}></i>
                        <span className="logo-text">Nigus Market</span>
                      </div>
            <div className="header-actions">
              <div className="header-action-item">
                <button 
                  className="icon-btn" 
                  title="Bookmarks"
                  onClick={() => setShowBookmarks(!showBookmarks)}
                >
                  <i className="fas fa-bookmark"></i>
                  {bookmarks.length > 0 && <span className="badge">{bookmarks.length}</span>}
                </button>
                {showBookmarks && (
                  <div className="dropdown-menu bookmarks-dropdown">
                    <h3>Bookmarks ({bookmarks.length})</h3>
                    {bookmarks.length === 0 ? (
                      <p>No bookmarks yet</p>
                    ) : (
                      bookmarks.map(item => (
                        <div key={item.id} className="dropdown-item" onClick={() => openProductModal(item)}>
                          <img src={item.image} alt={item.title} />
                          <span>{item.title}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <div className="header-action-item">
                <button 
                  className="icon-btn notification-btn" 
                  title="Messages"
                  onClick={() => {
                    setShowMessages(!showMessages);
                    if (messages > 0 && !showMessages) clearMessages();
                  }}
                >
                  <i className="fas fa-comment"></i>
                  {messages > 0 && <span className="badge">{messages}</span>}
                </button>
                {showMessages && (
                  <div className="dropdown-menu messages-dropdown">
                    <h3>Messages</h3>
                    <p>No new messages</p>
                  </div>
                )}
              </div>
              <div className="header-action-item">
                <button 
                  className="icon-btn notification-btn" 
                  title="Notifications"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (notifications > 0 && !showNotifications) clearNotifications();
                  }}
                >
                  <i className="fas fa-bell"></i>
                  {notifications > 0 && <span className="badge">{notifications}</span>}
                </button>
                {showNotifications && (
                  <div className="dropdown-menu notifications-dropdown">
                    <h3>Notifications</h3>
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
              <div className="header-action-item">
                <button 
                  className="icon-btn" 
                  title="My Ads"
                  onClick={() => setShowMyAds(!showMyAds)}
                >
                  <i className="fas fa-list"></i>
                </button>
                {showMyAds && (
                  <div className="dropdown-menu my-ads-dropdown">
                    <h3>My Ads</h3>
                    <p>You haven't posted any ads yet</p>
                  </div>
                )}
              </div>
              <div className="header-action-item">
                <button 
                  className="icon-btn" 
                  title="Account"
                  onClick={() => setShowAccount(!showAccount)}
                >
                  <i className="fas fa-user"></i>
                </button>
                {showAccount && (
                  <div className="dropdown-menu account-dropdown">
                    <div className="account-menu-item" onClick={() => alert('Profile clicked')}>
                      <i className="fas fa-user"></i>
                      <span>My Profile</span>
                    </div>
                    <div className="account-menu-item" onClick={() => alert('Settings clicked')}>
                      <i className="fas fa-cog"></i>
                      <span>Settings</span>
                    </div>
                    <div className="account-menu-item" onClick={() => alert('Logout clicked')}>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="header-action-item">
                <button 
                  className="icon-btn cart-btn" 
                  title="Shopping Cart"
                  onClick={() => setShowCart(!showCart)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
                </button>
              </div>
              <button 
                className="sell-btn"
                onClick={() => setShowSellModal(true)}
              >
                SELL
              </button>
            </div>
          </div>
        </div>
        <div className="search-section">
          <p className="search-prompt">What are you looking for?</p>
          <div className="search-container">
            <select 
              className="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>All Ethiopia</option>
              <option>Addis Ababa</option>
              <option>Dire Dawa</option>
              <option>Hawassa</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="I am looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
                  <aside className="sidebar">
                    <h2 className="sidebar-title">Categories</h2>
                    <ul className="category-list">
                      <li
                        className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                      >
                        <i className="fas fa-th"></i>
                        <span className="category-name">All Categories</span>
                        <span className="category-count">{products.length} ads</span>
                        <i className="fas fa-chevron-right"></i>
                      </li>
                      {categories.map(category => (
                        <li
                          key={category.id}
                          className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <i className={category.icon}></i>
                          <span className="category-name">{category.name}</span>
                          <span className="category-count">{category.count.toLocaleString()} ads</span>
                          <i className="fas fa-chevron-right"></i>
                        </li>
                      ))}
                    </ul>
                  </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h2 className="section-title">Trending ads</h2>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <i className="fas fa-th"></i>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div className={`products-container ${viewMode}`}>
            {searchedProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => openProductModal(product)}
              >
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400';
                    }}
                  />
                  <div className="product-watermark">POSTED ON NIGUS {product.seller.toUpperCase()}</div>
                  <button 
                    className={`bookmark-btn ${isBookmarked(product.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(product);
                    }}
                    title={isBookmarked(product.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  >
                    <i className={`fas ${isBookmarked(product.id) ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-price">{formatPrice(product.price)}</div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-location">
                      <i className="fas fa-map-marker-alt"></i> {product.location}
                    </span>
                    <span className={`product-condition ${product.condition.toLowerCase()}`}>
                      {product.condition}
                    </span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
            {/* Invisible placeholder products for spacing */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`placeholder-${index}`} className="product-card invisible-product" aria-hidden="true">
                <div className="product-image">
                  <div style={{ width: '100%', height: '200px', background: 'transparent' }}></div>
                </div>
                <div className="product-info">
                  <div className="product-price"></div>
                  <h3 className="product-title"></h3>
                  <p className="product-description"></p>
                  <div className="product-meta"></div>
                  <button className="add-to-cart-btn"></button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content-cart" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-cart">
              <h2>Shopping Cart ({getCartCount()})</h2>
              <button className="close-btn" onClick={() => setShowCart(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-cart">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        <p>{formatPrice(item.price)}</p>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <div className="cart-footer">
                    <div className="cart-total">
                      <strong>Total: {formatPrice(getCartTotal())}</strong>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div className="modal-content-product" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProductModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="product-modal-content">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              <div className="product-modal-info">
                <h2>{selectedProduct.title}</h2>
                <div className="product-modal-price">{formatPrice(selectedProduct.price)}</div>
                <p>{selectedProduct.description}</p>
                <div className="product-modal-meta">
                  <p><i className="fas fa-map-marker-alt"></i> {selectedProduct.location}</p>
                  <p><i className="fas fa-user"></i> {selectedProduct.seller}</p>
                  <p><span className={`product-condition ${selectedProduct.condition.toLowerCase()}`}>
                    {selectedProduct.condition}
                  </span></p>
                </div>
                <div className="product-modal-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductModal();
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                  <button 
                    className={`bookmark-modal-btn ${isBookmarked(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleBookmark(selectedProduct)}
                  >
                    <i className="fas fa-bookmark"></i> {isBookmarked(selectedProduct.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sell Item Modal */}
      {showSellModal && (
        <div className="modal-overlay" onClick={() => setShowSellModal(false)}>
          <div className="modal-content-sell" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Post Your Ad</h2>
              <button className="close-btn" onClick={() => setShowSellModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-sell">
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Your ad has been posted successfully!');
                setShowSellModal(false);
                setSellForm({
                  title: '',
                  description: '',
                  price: '',
                  category: 'all',
                  condition: 'New',
                  location: 'Addis Ababa',
                  image: ''
                });
              }}>
                <div className="form-group">
                  <label>Product Title *</label>
                  <input
                    type="text"
                    required
                    value={sellForm.title}
                    onChange={(e) => setSellForm({...sellForm, title: e.target.value})}
                    placeholder="e.g., iPhone 13 Pro Max 256GB"
                  />
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    required
                    value={sellForm.description}
                    onChange={(e) => setSellForm({...sellForm, description: e.target.value})}
                    placeholder="Provide detailed information about your product, condition, features, etc."
                    rows="5"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (ETB) *</label>
                    <input
                      type="number"
                      required
                      value={sellForm.price}
                      onChange={(e) => setSellForm({...sellForm, price: e.target.value})}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      required
                      value={sellForm.category}
                      onChange={(e) => setSellForm({...sellForm, category: e.target.value})}
                    >
                      <option value="all">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Condition *</label>
                    <select
                      required
                      value={sellForm.condition}
                      onChange={(e) => setSellForm({...sellForm, condition: e.target.value})}
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Locked">Locked</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <select
                      required
                      value={sellForm.location}
                      onChange={(e) => setSellForm({...sellForm, location: e.target.value})}
                    >
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Dire Dawa">Dire Dawa</option>
                      <option value="Hawassa">Hawassa</option>
                      <option value="Mekelle">Mekelle</option>
                      <option value="Gondar">Gondar</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Product Image URL</label>
                  <input
                    type="url"
                    value={sellForm.image}
                    onChange={(e) => setSellForm({...sellForm, image: e.target.value})}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <small style={{ display: 'block', marginTop: '0.5rem', color: '#6b7280', fontSize: '0.85rem' }}>
                    Optional: Add a direct link to your product image
                  </small>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowSellModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Post Ad
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NigusEcommerce;

