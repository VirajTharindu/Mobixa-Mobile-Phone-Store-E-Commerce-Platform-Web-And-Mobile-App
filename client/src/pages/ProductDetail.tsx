import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { useRoute, useLocation, Link } from "wouter";
import { Star, Truck, ShieldCheck, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const product = products.find(p => p.id === params?.id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  
  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  // Generate some dummy images for the gallery
  const images = [product.image, product.image, product.image, product.image];
  const storageOptions = [
    { size: "128GB", price: product.price - 100 },
    { size: "256GB", price: product.price },
    { size: "512GB", price: product.price + 200 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Store</Link>
          <ArrowRight className="w-3 h-3" />
          <Link href="/category/smartphones" className="hover:text-primary transition-colors">{product.category}</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-32">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 relative group">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "aspect-square rounded-2xl overflow-hidden border-2 transition-all p-1",
                    activeImage === idx ? "border-primary bg-primary/10" : "border-transparent bg-white/5 hover:border-white/20"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-6 border border-primary/20">
                NEW ARRIVAL
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">{product.name}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">{product.description}</p>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current text-amber-400/30" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">({product.rating} • {product.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Choose Color</h3>
              <div className="flex gap-4">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={cn(
                      "w-12 h-12 rounded-full border-4 transition-all relative",
                      selectedColor === idx ? "border-primary scale-110 shadow-lg shadow-primary/20" : "border-white/5 hover:border-white/20"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === idx && <div className="absolute inset-0 rounded-full border border-black/20" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Storage Capacity</h3>
              <div className="grid grid-cols-3 gap-4">
                {storageOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={cn(
                      "px-6 py-4 rounded-2xl border-2 text-left transition-all",
                      selectedStorage === idx 
                        ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                        : "border-white/5 bg-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="font-black text-lg tracking-tighter leading-none mb-1">{opt.size}</div>
                    <div className="text-xs font-bold opacity-60">${opt.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => setLocation("/cart")}
                className="flex-[2] bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 bg-white text-black hover:bg-white/90 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                Buy Now
              </button>
            </div>

            <div className="flex gap-10 pt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Free Express Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> 2 Year Global Warranty
              </div>
            </div>
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <h2 className="text-4xl font-black tracking-tight">Technical Spec Sheet</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(product.specs).map(([key, value], idx) => (
              <div key={idx} className="bg-card/40 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  {idx === 0 ? <Zap className="w-6 h-6 fill-current" /> : 
                   idx === 1 ? <div className="w-6 h-6 border-2 border-current rounded-lg" /> :
                   <div className="w-6 h-6 bg-current rounded-md" />}
                </div>
                <h3 className="font-black text-2xl tracking-tighter mb-2">{value}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">{key}</p>
                <div className="h-px w-8 bg-white/10 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
