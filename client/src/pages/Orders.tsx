import { Layout } from "@/components/Layout";
import { orders } from "@/lib/data";
import { Search, Bell, Package, Save, Settings, LogOut, ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Orders() {
  const activeTab = "My Orders";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar Navigation - simplified version of Layout for dashboard */}
      <aside className="w-64 border-r border-white/5 bg-[#050508] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-foreground animate-spin-slow" />
          </div>
          <span className="text-white">TechStore</span>
        </div>

        <div className="space-y-1 mb-8">
          <div className="text-xs font-bold text-muted-foreground uppercase px-3 mb-2">Customer Portal</div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-4 h-4 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /></div> Profile Info
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-primary/10 rounded-lg">
              <Package className="w-4 h-4 text-primary" /> My Orders
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Save className="w-4 h-4" /> Saved Devices
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover rounded-full" alt="" />
             </div>
             <div>
               <div className="text-xs font-bold">Alex Rivera</div>
               <div className="text-[10px] text-primary">Pro Member</div>
             </div>
          </div>
          <button className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1">
            <LogOut className="w-3 h-3" /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0f]/80 backdrop-blur sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search orders, serial numbers, or invoices..." 
              className="w-full bg-secondary/30 border border-transparent rounded-lg pl-9 pr-4 py-1.5 text-xs focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
            <button className="bg-primary hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
               Browse Store
            </button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Order History</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-colors">
              <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
              <div className="text-3xl font-bold">24</div>
              <div className="absolute right-6 top-6 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2 this month
              </div>
            </div>
            
            <div className="bg-card border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-colors">
              <div className="text-sm text-muted-foreground mb-1">Active Shipments</div>
              <div className="text-3xl font-bold">02</div>
              <div className="absolute right-6 top-6 px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded">
                In Transit
              </div>
            </div>
            
            <div className="bg-card border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-colors">
              <div className="text-sm text-muted-foreground mb-1">Saved Items</div>
              <div className="text-3xl font-bold">15</div>
              <div className="absolute right-6 top-6 text-[10px] font-bold text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                View Wishlist
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Recent Orders</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-secondary/30 rounded text-xs font-medium hover:bg-secondary/50 transition-colors">Last 30 Days</button>
              <button className="px-3 py-1.5 border border-white/10 rounded text-xs font-medium hover:bg-white/5 transition-colors">All Status</button>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-card border border-white/5 rounded-2xl p-6 transition-all hover:border-primary/20">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg p-2">
                      <img src={order.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-xs text-primary font-bold mb-0.5">ORDER {order.id}</div>
                      <h3 className="font-bold text-lg">{order.product}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-0.5">Placed on {order.date}</div>
                    <div className="font-bold text-lg">${order.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
                  </div>
                </div>

                {order.status === "Shipped" && (
                  <div className="mb-6 bg-secondary/10 rounded-xl p-4">
                    <div className="flex justify-between text-xs font-bold mb-3">
                      <span className="text-blue-400 flex items-center gap-2"><Package className="w-3 h-3" /> Status: Shipped</span>
                      <span className="text-muted-foreground">Estimated delivery: {order.estimatedDelivery}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                      <div className="absolute left-0 top-0 h-full bg-primary w-2/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
                      <span className="text-white">Confirmed</span>
                      <span className="text-white">Processing</span>
                      <span className="text-primary">Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors">Track Package</button>
                      <button className="px-4 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">View Details</button>
                    </div>
                  </div>
                )}

                {order.status === "Delivered" && (
                   <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">✓</div>
                        Delivered on {order.deliveredDate}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">Return</button>
                        <button className="px-4 py-1.5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">Download Invoice</button>
                      </div>
                   </div>
                )}
                
                {order.status === "Processing" && (
                   <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                        <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center animate-pulse">●</div>
                        Processing Order
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">View Order</button>
                      </div>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
