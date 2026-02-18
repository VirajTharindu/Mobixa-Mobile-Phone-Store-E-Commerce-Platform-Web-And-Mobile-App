import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { Link } from "wouter";
import { ShoppingCart, Filter, ChevronDown, Check, Star, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Category() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Apple", "256GB"]);
  const [priceRange, setPriceRange] = useState([0, 1200]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Discovery › Smartphones</div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">High Performance <span className="text-primary">Mobile</span></h1>
            <p className="text-muted-foreground font-medium">Displaying 12 flagship devices from our exclusive inventory.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Order by:</span>
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-xl hover:bg-white/10 transition-all border border-white/5">
              Popularity <ChevronDown className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-white border-l-4 border-primary pl-4">Brand Origin</h3>
              <div className="space-y-3">
                {['Apple', 'Samsung', 'Google', 'OnePlus'].map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={cn(
                        "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                        activeFilters.includes(brand) ? "bg-primary border-primary scale-110 shadow-lg shadow-primary/20" : "border-white/10 group-hover:border-primary/50"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFilter(brand);
                      }}
                    >
                      {activeFilters.includes(brand) && <Check className="w-3 h-3 text-white stroke-[4]" />}
                    </div>
                    <span className={cn("text-sm font-bold transition-colors", activeFilters.includes(brand) ? "text-white" : "text-muted-foreground group-hover:text-white")}>{brand}</span>
                    <span className="text-[10px] font-black text-muted-foreground/40 ml-auto tracking-widest">12</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-white border-l-4 border-primary pl-4">Budget Range</h3>
              <div className="h-1.5 bg-white/5 rounded-full relative mb-6">
                <div className="absolute left-0 w-2/3 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <div className="absolute left-[66%] w-4 h-4 bg-white rounded-full -top-1.5 -ml-2 border-4 border-primary cursor-grab active:cursor-grabbing"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-white">
                  <span className="text-primary mr-2">$</span> 0
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-white">
                  <span className="text-primary mr-2">$</span> 1200
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-white border-l-4 border-primary pl-4">Data Capacity</h3>
              <div className="grid grid-cols-2 gap-3">
                {['128GB', '256GB', '512GB', '1TB'].map(storage => (
                  <button 
                    key={storage}
                    onClick={() => toggleFilter(storage)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                      activeFilters.includes(storage) ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 border-transparent text-muted-foreground hover:border-white/20"
                    )}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/product/${product.id}`} className="group block bg-card/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
                    <div className="aspect-[4/5] bg-[#0d0d12] rounded-2xl mb-6 overflow-hidden relative p-6">
                      {product.stock === 'Low Stock' && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-500/20 z-10">
                          SCARCITY
                        </div>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-[10px] font-black">{product.rating}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{product.reviews} REVIEWS</span>
                      </div>

                      <h3 className="font-black text-2xl tracking-tighter group-hover:text-primary transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <span>{product.brand}</span>
                        <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(59,130,246,1)]"></div>
                        <span>High-Res</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="block font-black text-2xl tracking-tighter">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] font-black text-muted-foreground line-through opacity-40">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="w-12 h-12 bg-primary hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-primary/20">
                        <Zap className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-20 gap-3">
              {[1, 2, 3, '...', 12].map((page, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-2xl text-xs font-black transition-all",
                    page === 1 ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
