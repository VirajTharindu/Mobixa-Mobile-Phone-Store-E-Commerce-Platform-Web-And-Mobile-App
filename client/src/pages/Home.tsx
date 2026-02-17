import { Layout } from "@/components/Layout";
import { products, categories } from "@/lib/data";
import { Link } from "wouter";
import { ArrowRight, Play, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-background to-[#0a0a0f]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              NEW RELEASE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Titanium <span className="text-primary">Series X</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the future with the Snapdragon 8 Gen 3 processor, AI-enhanced photography, and an aerospace-grade titanium body.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/product/1">
                <a className="inline-flex items-center bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105">
                  Buy Now - $999 <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Link>
              
              <button className="inline-flex items-center bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium border border-white/10 transition-all">
                <Play className="mr-2 w-4 h-4 fill-current" /> Watch Trailer
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div>
                <div className="text-xl font-bold">200MP</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Main Camera</div>
              </div>
              <div>
                <div className="text-xl font-bold">120Hz</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">OLED Display</div>
              </div>
              <div>
                <div className="text-xl font-bold">5000mAh</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Battery Life</div>
              </div>
            </div>
          </div>
          
          <div className="relative z-0">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800" 
              alt="Titanium Series X" 
              className="relative z-10 w-full max-w-md mx-auto transform rotate-[-12deg] hover:rotate-0 transition-all duration-700 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
              <p className="text-muted-foreground">Curated selections for every need</p>
            </div>
            <Link href="/category/all">
              <a className="text-primary hover:text-blue-400 text-sm font-medium flex items-center">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.id}`}>
                <a className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300">
                  <div className="p-6 z-10 relative">
                    <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <a className="group bg-card border border-white/5 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden relative">
                    <div className="absolute top-2 right-2 z-10">
                      <span className={cn(
                        "px-2 py-1 text-[10px] font-bold uppercase rounded-sm",
                        product.stock === 'In Stock' ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                      )}>
                        {product.stock}
                      </span>
                    </div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
