import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { useRoute, useLocation } from "wouter";
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className="cursor-pointer hover:text-primary" onClick={() => setLocation("/")}>Store</span>
          <ArrowRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-primary" onClick={() => setLocation("/category/smartphones")}>{product.category}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/5 relative group">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-primary" : "border-transparent hover:border-white/20"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
                NEW ARRIVAL
              </div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current text-amber-400/30" />
                </div>
                <span className="text-sm text-muted-foreground">({product.rating} • {product.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Choose Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 ring-2 ring-offset-2 ring-offset-background transition-all",
                      selectedColor === idx ? "border-transparent ring-primary" : "border-white/10 ring-transparent hover:ring-white/20"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Storage Capacity</h3>
              <div className="grid grid-cols-3 gap-3">
                {storageOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={cn(
                      "px-4 py-3 rounded-lg border text-center transition-all",
                      selectedStorage === idx 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <div className="font-bold text-sm">{opt.size}</div>
                    <div className="text-xs text-muted-foreground">${opt.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button 
                onClick={() => setLocation("/cart")}
                className="flex-1 bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold border border-white/10 transition-colors">
                Buy Now
              </button>
            </div>

            <div className="flex gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> 2 Year Warranty
              </div>
            </div>
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-bold">Technical Deep Dive</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(product.specs).map(([key, value], idx) => (
              <div key={idx} className="bg-card border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {idx === 0 ? <div className="w-5 h-5 border-2 border-current rounded-full" /> : 
                   idx === 1 ? <div className="w-5 h-5 border-2 border-current" /> :
                   <div className="w-5 h-5 bg-current rounded-sm" />}
                </div>
                <h3 className="font-bold text-lg mb-1">{value}</h3>
                <p className="text-sm text-muted-foreground">{key}</p>
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-white/5">
                  Industry leading performance for {key.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Verdict */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Customer Verdict</h2>
            <div className="bg-card border border-white/5 p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-2">4.8<span className="text-xl text-muted-foreground font-normal">/5.0</span></div>
              
              <div className="flex text-amber-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-8">
                98% of users would recommend this flagship model to a friend.
              </p>

              <div className="space-y-3">
                {[5, 4, 3].map((star, i) => (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-2">{star}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: i === 0 ? '85%' : i === 1 ? '10%' : '5%' }}
                      />
                    </div>
                    <span className="w-6 text-right text-muted-foreground">{i === 0 ? '85%' : i === 1 ? '10%' : '5%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Recent Reviews</h3>
              <button className="text-primary text-sm hover:underline">Write a Review</button>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">MS</div>
                  <div>
                    <div className="font-bold text-sm">Marcus Sterling</div>
                    <div className="text-[10px] text-primary">VERIFIED BUYER</div>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-2">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The titanium build is significantly lighter than previous generations. The camera's dynamic range is incredible, especially in low-light environments. Worth every penny.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">AL</div>
                  <div>
                    <div className="font-bold text-sm">Anna Lawson</div>
                    <div className="text-[10px] text-primary">VERIFIED BUYER</div>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-2">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Blown away by the screen clarity. I upgraded from the X12 and this difference in speed and screen brightness is night and day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
