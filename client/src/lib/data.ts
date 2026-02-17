
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  specs: Record<string, string>;
  description: string;
  stock: 'In Stock' | 'Low Stock' | 'Out of Stock';
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Titanium Series X",
    brand: "TechZone",
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
    colors: ["#1a1a1a", "#e5e5e5", "#3b82f6"]
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    rating: 4.9,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1610945265078-386f3b58d86f?auto=format&fit=crop&q=80&w=800",
    category: "Smartphones",
    specs: {
      "Main Camera": "200MP Wide",
      "Display": "6.8\" AMOLED 2X",
      "Battery": "5000mAh",
      "Processor": "Snapdragon 8 Gen 3"
    },
    description: "The ultimate galaxy experience with AI features.",
    stock: "In Stock",
    colors: ["#2d2d2d", "#f0f0f0", "#d4af37"]
  },
  {
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
    colors: ["#1c1c1e", "#f5f5f7", "#323e4f"]
  },
  {
    id: "4",
    name: "Pixel 9 Pro",
    brand: "Google",
    price: 999,
    rating: 4.7,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&q=80&w=800",
    category: "Smartphones",
    specs: {
      "Main Camera": "50MP",
      "Display": "6.7\" LTPO OLED",
      "Battery": "5050mAh",
      "Processor": "Google Tensor G4"
    },
    description: "The most advanced Pixel camera ever.",
    stock: "In Stock",
    colors: ["#1f2020", "#e3e3e3", "#8ab4f8"]
  },
  {
    id: "5",
    name: "Xperia 1 V",
    brand: "Sony",
    price: 1399,
    rating: 4.6,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?auto=format&fit=crop&q=80&w=800",
    category: "Smartphones",
    specs: {
      "Main Camera": "48MP Exmor T",
      "Display": "4K HDR OLED",
      "Battery": "5000mAh",
      "Processor": "Snapdragon 8 Gen 2"
    },
    description: "Created for creators. Next-generation sensor.",
    stock: "In Stock",
    colors: ["#000000", "#c0c0c0", "#2e8b57"]
  },
  {
    id: "6",
    name: "Sonic Buds X",
    brand: "TechZone",
    price: 249,
    rating: 4.5,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    category: "Audio",
    specs: {
      "Type": "In-Ear",
      "Noise Cancellation": "Active",
      "Battery Life": "24h"
    },
    description: "Immersive sound with active noise cancellation.",
    stock: "In Stock",
    colors: ["#000000", "#ffffff"]
  }
];

export const categories = [
  {
    id: "gaming",
    name: "Gaming Beasts",
    description: "High refresh rates & advanced cooling",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "photography",
    name: "Pro Photography",
    description: "Massive sensors & 100x zoom",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "budget",
    name: "Budget Champions",
    description: "Best value for money performance",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
  }
];

export const orders = [
  {
    id: "#TX-98231",
    product: "MacBook Pro M3 Max - 14-inch",
    price: 3499.00,
    date: "Oct 24, 2023",
    status: "Shipped",
    estimatedDelivery: "Oct 28, 2023",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "#TX-97442",
    product: "AirPods Max - Space Gray",
    price: 549.00,
    date: "Sep 12, 2023",
    status: "Delivered",
    deliveredDate: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "#TX-98501",
    product: "Wi-Fi 7 Pro Mesh System (3-Pack)",
    price: 899.00,
    date: "Oct 25, 2023",
    status: "Processing",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200"
  }
];
