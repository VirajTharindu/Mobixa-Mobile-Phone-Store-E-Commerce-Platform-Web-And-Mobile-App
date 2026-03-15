class Product {
  final String id;
  final String name;
  final String brand;
  final double price;
  final double? originalPrice;
  final double rating;
  final int reviews;
  final String image;
  final String category;
  final Map<String, String> specs;
  final String description;
  final String stock;
  final List<String> colors;

  Product({
    required this.id,
    required this.name,
    required this.brand,
    required this.price,
    this.originalPrice,
    required this.rating,
    required this.reviews,
    required this.image,
    required this.category,
    required this.specs,
    required this.description,
    required this.stock,
    required this.colors,
  });
}

class Category {
  final String id;
  final String name;
  final String description;
  final String image;

  Category({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
  });
}

class Order {
  final String id;
  final String product;
  final double price;
  final String date;
  final String status;
  final String? estimatedDelivery;
  final String? deliveredDate;
  final String image;

  Order({
    required this.id,
    required this.product,
    required this.price,
    required this.date,
    required this.status,
    this.estimatedDelivery,
    this.deliveredDate,
    required this.image,
  });
}

final List<Product> mockProducts = [
  Product(
    id: "1",
    name: "Titanium Series X",
    brand: "Mobixa",
    price: 999,
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800",
    category: "Smartphones",
    specs: {
      "Main Camera": "200MP",
      "Display": "120Hz OLED",
      "Battery": "5000mAh",
      "Processor": "Snapdragon 8 Gen 3"
    },
    description: "Experience the future with the Snapdragon 8 Gen 3 processor, AI-enhanced photography, and an aerospace-grade titanium body.",
    stock: "In Stock",
    colors: ["#1a1a1a", "#e5e5e5", "#3b82f6"],
  ),
  Product(
    id: "2",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    rating: 4.9,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1707151022130-1c5c00b5220c?q=80&w=800&auto=format&fit=crop",
    category: "Smartphones",
    specs: {
      "Main Camera": "200MP Wide",
      "Display": "6.8\" AMOLED 2X",
      "Battery": "5000mAh",
      "Processor": "Snapdragon 8 Gen 3"
    },
    description: "The ultimate galaxy experience with AI features.",
    stock: "In Stock",
    colors: ["#2d2d2d", "#f0f0f0", "#d4af37"],
  ),
  Product(
    id: "3",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    rating: 4.8,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
    category: "Smartphones",
    specs: {
      "Main Camera": "48MP Wide",
      "Display": "6.7\" OLED",
      "Battery": "4441mAh",
      "Processor": "A17 Pro"
    },
    description: "Titanium design, A17 Pro chip, and Pro camera system.",
    stock: "Low Stock",
    colors: ["#1c1c1e", "#f5f5f7", "#323e4f"],
  ),
  Product(
    id: "4",
    name: "Pixel 9 Pro",
    brand: "Google",
    price: 999,
    rating: 4.7,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    category: "Smartphones",
    specs: {
      "Main Camera": "50MP",
      "Display": "6.7\" LTPO OLED",
      "Battery": "5050mAh",
      "Processor": "Google Tensor G4"
    },
    description: "The most advanced Pixel camera ever.",
    stock: "In Stock",
    colors: ["#1f2020", "#e3e3e3", "#8ab4f8"],
  ),
];

final List<Category> mockCategories = [
  Category(
    id: "gaming",
    name: "Gaming Beasts",
    description: "High refresh rates & advanced cooling",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
  ),
  Category(
    id: "photography",
    name: "Pro Photography",
    description: "Massive sensors & 100x zoom",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  ),
  Category(
    id: "budget",
    name: "Budget Champions",
    description: "Best value for money performance",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
  ),
];

final List<Order> mockOrders = [
  Order(
    id: "#MX-98231",
    product: "NeoPhone 15 Pro",
    price: 3499.00,
    date: "Oct 24, 2023",
    status: "Shipped",
    estimatedDelivery: "Oct 28, 2023",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=200",
  ),
  Order(
    id: "#MX-97442",
    product: "Sonic Buds X",
    price: 549.00,
    date: "Sep 12, 2023",
    status: "Delivered",
    deliveredDate: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200",
  ),
];
