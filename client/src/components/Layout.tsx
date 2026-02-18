import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
      scrolled 
        ? "bg-background/80 backdrop-blur-xl border-white/5 py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Zap className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">TechZone</span>
            </a>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/category/smartphones">
              <a className={cn("hover:text-primary transition-all hover:tracking-[0.2em]", location.startsWith("/category") && "text-primary")}>
                Smartphones
              </a>
            </Link>
            <Link href="/category/laptops">
              <a className="hover:text-primary transition-all hover:tracking-[0.2em]">Laptops</a>
            </Link>
            <Link href="/compare">
              <a className={cn("hover:text-primary transition-all hover:tracking-[0.2em]", location === "/compare" && "text-primary")}>
                Compare
              </a>
            </Link>
            <Link href="/support">
              <a className="hover:text-primary transition-all hover:tracking-[0.2em]">Support</a>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center relative group">
            <Search className="w-4 h-4 absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search devices..." 
              className="pl-11 pr-6 py-2.5 bg-white/5 rounded-full text-xs font-bold border border-white/5 focus:border-primary focus:bg-white/10 focus:outline-none w-48 focus:w-72 transition-all duration-500"
            />
          </div>

          <Link href="/cart">
            <a className="relative p-3 bg-white/5 hover:bg-primary hover:text-white rounded-2xl transition-all group">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-black border-2 border-background group-hover:bg-white group-hover:text-primary transition-colors">
                2
              </span>
            </a>
          </Link>

          <Link href="/orders">
            <a className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
              <User className="w-5 h-5" />
            </a>
          </Link>

          <button 
            className="lg:hidden p-3 bg-white/5 rounded-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-background overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {['Smartphones', 'Laptops', 'Compare', 'Support'].map(item => (
                <Link key={item} href={`/${item.toLowerCase()}`}>
                  <a className="flex justify-between items-center py-4 text-lg font-black tracking-tight border-b border-white/5 hover:text-primary">
                    {item} <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-black tracking-tighter">TechZone</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting the future of retail through high-performance hardware and exceptional user experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">Smartphones</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Laptops</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Deals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-bold">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Warranty</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Join the Elite</h4>
            <p className="text-xs text-muted-foreground mb-6 font-medium">Get early access to drops and member-only pricing.</p>
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none rounded-xl px-4 py-2 text-xs w-full focus:outline-none"
              />
              <button className="bg-primary hover:bg-blue-600 text-white p-2 rounded-xl transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <p>© 2024 TechZone Global Operations.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
