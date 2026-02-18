import { Layout } from "@/components/Layout";
import { products, categories } from "@/lib/data";
import { Link } from "wouter";
import { ArrowRight, Play, ShoppingCart, Zap, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 z-10"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 tracking-wider">
              <Zap className="w-3 h-3 mr-2 fill-current" />
              NEW RELEASE
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Titanium <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">Series X</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Experience the future with the Snapdragon 8 Gen 3 processor, AI-enhanced photography, and an aerospace-grade titanium body.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/product/1" className="inline-flex items-center bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Buy Now - $999 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <button className="inline-flex items-center bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold border border-white/10 backdrop-blur-sm transition-all">
                <Play className="mr-2 w-4 h-4 fill-current" /> Watch Trailer
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div>
                <div className="text-2xl font-black">200MP</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Main Camera</div>
              </div>
              <div>
                <div className="text-2xl font-black">120Hz</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">OLED Display</div>
              </div>
              <div>
                <div className="text-2xl font-black">5000mAh</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Battery Life</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-0"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800" 
              alt="Titanium Series X" 
              className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] hover:rotate-0 transition-all duration-700 cursor-crosshair"
            />
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {['Apple', 'Samsung', 'Google', 'Sony', 'OnePlus'].map(brand => (
             <span key={brand} className="text-xl font-black tracking-tighter">{brand}</span>
           ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black mb-3 tracking-tight">Featured Collections</h2>
              <p className="text-muted-foreground text-lg">Curated selections for every digital nomad and creative pro.</p>
            </div>
            <Link href="/category/all" className="group text-primary hover:text-blue-400 text-sm font-bold flex items-center transition-all">
              View All Collections <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/category/${cat.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-black mb-2">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.description}</p>
                    <div className="mt-4 w-10 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  </div>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-black tracking-tight">New Arrivals</h2>
            <div className="flex gap-3">
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.slice(0, 4).map((product) => (
              <motion.div key={product.id} variants={item}>
                <Link href={`/product/${product.id}`} className="group block bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="aspect-[4/5] bg-[#0d0d12] rounded-2xl mb-6 overflow-hidden relative">
                    <div className="absolute top-4 right-4 z-10">
                      <span className={cn(
                        "px-3 py-1 text-[10px] font-black uppercase rounded-full backdrop-blur-md border",
                        product.stock === 'In Stock' 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                      )}>
                        {product.stock}
                      </span>
                    </div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-[10px] font-bold">{product.rating}</span>
                    </div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-black text-2xl tracking-tighter">${product.price.toLocaleString()}</span>
                    <button className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
            <div className="max-w-2xl relative z-10">
              <ShieldCheck className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-5xl font-black mb-6 tracking-tight">The TechZone Guarantee</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We don't just sell gadgets. We provide 24/7 technical support, extended warranties, and a seamless trade-in program for all our pro members.
              </p>
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
                Become a Pro Member
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
