import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShieldCheck, CreditCard, Wallet, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { product: products[2], quantity: 1, color: "Titanium Black", option: "512GB", sub: "A17 PRO CHIP" },
    { product: products[5], quantity: 1, color: "Space Gray", option: "Noise Cancelling", sub: "Noise Cancelling" }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 uppercase tracking-widest font-black">
          <Link href="/" className="hover:text-primary transition-colors">STORE</Link> › <span className="text-primary">CART & CHECKOUT</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-4 bg-secondary/20 border-b border-white/5 flex justify-between text-xs font-medium text-muted-foreground">
                 <span>Items</span>
                 <span>{cartItems.length} items in your cart</span>
              </div>
              
              <div className="divide-y divide-white/5">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 bg-white/5 rounded-lg p-2 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{item.product.name === "iPhone 15 Pro Max" ? "NeoPhone 15 Pro" : item.product.name}</h3>
                        <div className="font-bold text-lg">${item.product.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                         <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase font-bold text-muted-foreground">{item.option}</span>
                         <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase font-bold text-muted-foreground">{item.color}</span>
                         <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase font-bold text-muted-foreground">{item.sub}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-background border border-white/10 rounded-lg p-1">
                          <button className="w-8 h-8 flex items-center justify-center hover:text-white text-muted-foreground transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button className="w-8 h-8 flex items-center justify-center hover:text-white text-muted-foreground transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        
                        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1">Upgrade to TechPlus Protection</h4>
                <p className="text-xs text-muted-foreground mb-2">Covers accidental damage, battery replacements, and priority support for 24 months.</p>
                <button className="text-xs font-bold text-primary hover:underline">ADD FOR $199.00</button>
              </div>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-6 sticky top-24">
              <h2 className="font-bold text-lg">Secure Checkout</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</div>
                  Shipping Details
                </div>
                
                <input type="text" placeholder="Full Name" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                  <input type="text" placeholder="Postal Code" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-primary bg-primary/5 rounded-lg p-3 cursor-pointer">
                    <div className="text-[10px] font-bold text-primary uppercase mb-1">STANDARD</div>
                    <div className="text-xs font-medium">Free • 3-5 days</div>
                  </div>
                  <div className="border border-white/10 hover:border-white/30 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">EXPRESS</div>
                    <div className="text-xs font-medium">$25 • Next day</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full border border-white/20 text-muted-foreground flex items-center justify-center text-xs">2</div>
                  Payment Method
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-primary/10 border border-primary text-primary rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2">
                    <CreditCard className="w-3 h-3" /> Card
                  </button>
                  <button className="bg-background border border-white/10 text-muted-foreground rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors">
                    <Wallet className="w-3 h-3" /> Wallet
                  </button>
                </div>
                
                <div className="relative">
                   <input type="text" placeholder="Card Number" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                     <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
                     <div className="w-6 h-4 bg-yellow-500 rounded-sm"></div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                  <input type="text" placeholder="CVV" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-500">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Taxes</span>
                  <span>${tax.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                COMPLETE PURCHASE <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground opacity-60">
                <ShieldCheck className="w-3 h-3" /> ENCRYPTED SECURE TRANSACTION
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                   <MessageSquare className="w-4 h-4" />
                 </div>
                 <div>
                   <div className="text-xs font-bold">Need help?</div>
                   <div className="text-[10px] text-muted-foreground">Chat with our hardware experts 24/7</div>
                 </div>
              </div>
              <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-colors">Chat</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
