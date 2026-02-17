import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, Plane } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground rotate-45" />
              </div>
              <span className="text-white">TechZone</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/category/smartphones">
              <a className={cn("hover:text-primary transition-colors", location.startsWith("/category") && "text-primary")}>
                Smartphones
              </a>
            </Link>
            <Link href="/category/laptops">
              <a className="hover:text-primary transition-colors">Laptops</a>
            </Link>
            <Link href="/compare">
              <a className={cn("hover:text-primary transition-colors", location === "/compare" && "text-primary")}>
                Compare
              </a>
            </Link>
            <Link href="/support">
              <a className="hover:text-primary transition-colors">Support</a>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search devices..." 
              className="pl-9 pr-4 py-1.5 bg-secondary/50 rounded-full text-sm border border-transparent focus:border-primary focus:outline-none w-64 transition-all"
            />
          </div>

          <Link href="/cart">
            <a className="relative p-2 hover:bg-secondary/50 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">
                2
              </span>
            </a>
          </Link>

          <Link href="/orders">
            <a className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </a>
          </Link>

          <button 
            className="md:hidden p-2 hover:bg-secondary/50 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/login">
             <a className="hidden md:inline-flex bg-primary hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
               Login
             </a>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 p-4 space-y-4 bg-background">
          <Link href="/category/smartphones">
            <a className="block py-2 text-sm font-medium">Smartphones</a>
          </Link>
          <Link href="/category/laptops">
            <a className="block py-2 text-sm font-medium">Laptops</a>
          </Link>
          <Link href="/compare">
            <a className="block py-2 text-sm font-medium">Compare</a>
          </Link>
          <Link href="/support">
            <a className="block py-2 text-sm font-medium">Support</a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay ahead of the curve.</h3>
            <p className="text-sm text-muted-foreground">Join our newsletter for exclusive drops, tech news, and member-only deals.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Smartphones</li>
              <li>Accessories</li>
              <li>Tablets</li>
              <li>Deals</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact Us</li>
              <li>Warranty</li>
              <li>Order Status</li>
              <li>Returns</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About TechZone</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© 2024 TechZone Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Twitter</span>
            <span>Instagram</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
