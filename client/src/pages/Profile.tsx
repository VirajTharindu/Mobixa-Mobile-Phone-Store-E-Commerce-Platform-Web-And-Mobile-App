import { Layout } from "@/components/Layout";
import { User, Shield, CreditCard, Package, LogOut, Settings, Award, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
    const user = {
        name: "Alex Rivera",
        email: "alex.rivera@techstore.pro",
        memberSince: "OCT 2023",
        status: "PRO MEMBER",
        points: 12450,
        orders: 24,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    };

    const statCards = [
        { icon: <Package className="w-5 h-5" />, label: "Deployments", value: user.orders, sub: "All time" },
        { icon: <Award className="w-5 h-5" />, label: "Tech Points", value: user.points.toLocaleString(), sub: "Redeemable" },
        { icon: <Shield className="w-5 h-5" />, label: "Security", value: "Level 4", sub: "Titanium" },
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 pt-32">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="glass-card rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                            <div className="w-32 h-32 mx-auto mb-6 relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse blur-xl" />
                                <img src={user.avatar} className="w-full h-full rounded-full object-cover border-4 border-white/10 relative z-10" alt="" />
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl border-4 border-background z-20">
                                    <Zap className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">{user.name}</h2>
                            <p className="text-[10px] font-black tracking-widest text-primary uppercase mb-6">{user.status}</p>

                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-primary fill-current" />)}
                            </div>

                            <div className="space-y-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span>Member Since</span>
                                    <span className="text-white">{user.memberSince}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span>System Status</span>
                                    <span className="text-emerald-500">ACTIVE</span>
                                </div>
                            </div>
                        </div>

                        <nav className="glass-card rounded-[2rem] p-4 flex flex-col gap-1">
                            <button className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                                <User className="w-4 h-4" /> Account Node
                            </button>
                            <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all">
                                <Settings className="w-4 h-4" /> System Config
                            </button>
                            <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all">
                                <CreditCard className="w-4 h-4" /> Credits/Vault
                            </button>
                            <div className="h-px bg-white/5 my-2 mx-4" />
                            <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest transition-all">
                                <LogOut className="w-4 h-4" /> Terminate Session
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            {statCards.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="glass-card rounded-3xl p-8 border border-white/5 relative group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
                                    <div className="text-3xl font-black tracking-tighter text-white mb-2">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{stat.sub}</div>
                                    <div className="absolute top-8 right-8 w-1 h-12 bg-primary/20 rounded-full" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <Shield className="w-40 h-40 text-primary" />
                            </div>
                            <div className="relative z-10 max-w-xl">
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Security Clearance G4</h3>
                                <p className="text-muted-foreground mb-8 text-lg font-medium leading-relaxed italic">
                                    "Your account is protected by military-grade encryption. You have early access to all future hardware drops and beta neural interfaces."
                                </p>
                                <div className="flex gap-4">
                                    <button className="px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/40">Upgrade Access</button>
                                    <button className="px-8 py-3 glass-card text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Review Protocol</button>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-[3rem] p-10 overflow-hidden">
                            <div className="flex justify-between items-end mb-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Recent Activity Log</h3>
                                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Download Archive</button>
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl hover:bg-white/5 border border-white/5 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Deployment Success</div>
                                            <div className="font-black text-lg uppercase tracking-tight">iPhone 15 Pro Max - Titanium Black</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black tracking-tighter">$1,199.00</div>
                                            <div className="text-[10px] font-black text-muted-foreground uppercase opacity-60">24 OCT 2023</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}
