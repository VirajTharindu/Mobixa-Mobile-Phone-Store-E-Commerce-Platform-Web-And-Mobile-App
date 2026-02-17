import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { Link } from "wouter";
import { ShoppingCart, Filter, ChevronDown, Check, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Home › Electronics › Smartphones</div>
            <h1 className="text-3xl font-bold">Mobile Phones</h1>
            <p className="text-sm text-muted-foreground">Showing 12 of 120 products</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <button className="flex items-center gap-2 text-sm font-medium bg-secondary/30 px-3 py-1.5 rounded-md hover:bg-secondary/50">
              Featured <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold mb-4">Brand</h3>
              <div className="space-y-2">
                {['Apple', 'Samsung', 'Google', 'OnePlus'].map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        activeFilters.includes(brand) ? "bg-primary border-primary" : "border-muted-foreground group-hover:border-primary"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFilter(brand);
                      }}
                    >
                      {activeFilters.includes(brand) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">{brand}</span>
                    <span className="text-xs text-muted-foreground ml-auto">(12)</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="h-1 bg-secondary rounded-full relative mb-4">
                <div className="absolute left-0 w-1/2 h-full bg-primary rounded-full"></div>
                <div className="absolute left-1/2 w-3 h-3 bg-primary rounded-full -top-1 -ml-1.5 ring-2 ring-background cursor-pointer"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-secondary/30 rounded px-3 py-2 text-sm border border-transparent focus-within:border-primary">
                  <span className="text-muted-foreground mr-1">$</span> 0
                </div>
                <div className="flex-1 bg-secondary/30 rounded px-3 py-2 text-sm border border-transparent focus-within:border-primary">
                  <span className="text-muted-foreground mr-1">$</span> 1200
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Storage</h3>
              <div className="space-y-2">
                {['128GB', '256GB', '512GB', '1TB'].map(storage => (
                  <label key={storage} className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        activeFilters.includes(storage) ? "bg-primary border-primary" : "border-muted-foreground group-hover:border-primary"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFilter(storage);
                      }}
                    >
                      {activeFilters.includes(storage) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">{storage}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <a className="group bg-card border border-white/5 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                    <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden relative p-4">
                      {product.stock === 'Low Stock' && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase rounded-sm z-10">
                          Low Stock
                        </div>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-overlay" 
                        style={{ mixBlendMode: 'normal' }}
                      />
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span>{product.specs["Main Camera"]?.split(' ')[0]} RAM</span>
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      <span>256GB</span>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <span className="block font-bold text-lg">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="flex-1 bg-primary hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </a>
                </Link>
              ))}
              
              {/* Duplicate products to fill grid */}
              {products.slice(0, 3).map((product, idx) => (
                <div key={`dup-${idx}`} className="group bg-card border border-white/5 rounded-xl p-4 opacity-70 hover:opacity-100 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden relative p-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse mb-4"></div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-9 flex-1 bg-white/5 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-primary hover:text-primary transition-colors">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-primary hover:text-primary transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-primary hover:text-primary transition-colors">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-muted-foreground">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-primary hover:text-primary transition-colors">
                12
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-primary hover:text-primary transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
