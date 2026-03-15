import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShieldCheck, CreditCard, Wallet, MessageSquare, ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-8">
          <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase mb-2">Cart is empty</h2>
            <p className="text-muted-foreground mb-8">Deploy some gear to your inventory first.</p>
            <Link href="/">
              <button className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Browse Store
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-32">
        <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Shopping Cart</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-12 uppercase tracking-[0.3em] font-black">
          <Link href="/" className="hover:text-primary transition-colors">STORE</Link>
          <span className="opacity-20">/</span>
          <span className="text-primary">CART & CHECKOUT</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Items</span>
                <span>{cart.length} unique models</span>
              </div>

              <div className="divide-y divide-white/5">
                {cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.color}-${item.option}`} className="p-8 flex flex-col sm:row gap-8">
                    <div className="w-40 h-40 bg-white/5 rounded-[2rem] p-4 flex-shrink-0 relative group">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-black tracking-widest text-primary uppercase mb-2 block">{item.product.brand}</span>
                          <h3 className="font-black text-2xl uppercase tracking-tighter">{item.product.name}</h3>
                        </div>
                        <div className="font-black text-2xl tracking-tighter">${item.product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] uppercase font-bold text-muted-foreground border border-white/5">{item.option}</span>
                        <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] uppercase font-bold text-muted-foreground border border-white/5">{item.color}</span>
                        {item.sub && <span className="px-3 py-1 bg-primary/10 rounded-lg text-[10px] uppercase font-bold text-primary border border-primary/20">{item.sub}</span>}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-2 px-4">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.color, item.option, -1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-black w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.color, item.option, 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.color, item.option)}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card border-primary/20 rounded-[2.5rem] p-8 flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-lg mb-2 uppercase italic tracking-tighter text-white">TECHPLUS PROTECTION G1</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Covers accidental damage, battery replacements, and orbital technical support for the next 24 cycles.</p>
                <button className="text-[10px] font-black text-primary hover:tracking-widest transition-all uppercase underline tracking-widest">Add to Security Protocol ($199.00)</button>
              </div>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="space-y-8">
            <div className="glass-card rounded-[2.5rem] p-8 space-y-8 sticky top-32">
              <h2 className="font-black text-2xl uppercase tracking-tighter italic">Secure Checkout</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px]">1</div>
                  Logistics
                </div>

                <input type="text" placeholder="DEPLOYMENT NAME" className="w-full glass-card bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary focus:outline-none transition-colors placeholder:opacity-30" />

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="CITY" className="w-full glass-card bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary focus:outline-none transition-colors placeholder:opacity-30" />
                  <input type="text" placeholder="ZIP CODE" className="w-full glass-card bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary focus:outline-none transition-colors placeholder:opacity-30" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-primary bg-primary/5 rounded-2xl p-4 cursor-pointer">
                    <div className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">STANDARD</div>
                    <div className="text-xs font-bold">Orbital • 3 Days</div>
                  </div>
                  <div className="border-2 border-white/5 hover:border-white/10 rounded-2xl p-4 cursor-pointer transition-colors">
                    <div className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">HYPER</div>
                    <div className="text-xs font-bold">$25 • Same Day</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                  <div className="w-6 h-6 rounded-lg border border-white/20 text-muted-foreground flex items-center justify-center text-[10px]">2</div>
                  Payment
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-primary/10 border border-primary text-primary rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" /> Card
                  </button>
                  <button className="bg-white/5 border border-white/5 text-muted-foreground rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <Wallet className="w-4 h-4" /> Wallet
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Logistics</span>
                  <span className="text-primary tracking-[0.2em]">FREE</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-end pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Impact</span>
                  <span className="text-4xl font-black tracking-tighter text-white">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-2xl shadow-primary/40">
                COMPLETE ORDER <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">
                <ShieldCheck className="w-3 h-3" /> Encrypted Protocol
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
