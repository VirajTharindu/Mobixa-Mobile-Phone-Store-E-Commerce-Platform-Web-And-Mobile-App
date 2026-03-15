import { Layout } from "@/components/Layout";
import { products, categories } from "@/lib/data";
import { Link } from "wouter";
import { ArrowRight, ShoppingCart, Zap, Star, ShieldCheck, Truck, Headphones, Lock, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneScene from "@/components/PhoneScene";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    if (headingRef.current) {
      const lines = headingRef.current.querySelectorAll(".line-wrapper");
      
      lines.forEach(line => {
        const text = (line as HTMLElement).innerText;
        const chars = text.split("");
        line.innerHTML = chars
          .map((c) => `<span class="char inline-block">${c === " " ? "&nbsp;" : c}</span>`)
          .join("");
      });

      gsap.fromTo(
        ".char",
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section with 3D Scene */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-12 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit pulse-gold">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Next Gen arrives</span>
            </div>

            <h1
              ref={headingRef}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] uppercase perspective-1000 flex flex-col"
            >
              <span className="line-wrapper block overflow-hidden">Beyond</span>
              <span className="line-wrapper block overflow-hidden text-primary italic">Reality</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg font-medium leading-relaxed">
              Engineered with Aerospace-Grade Titanium and the most powerful AI chip ever in a smartphone.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/40 magnetic-target">
                Experience Now
              </button>
              <button className="px-10 py-5 glass-card text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all magnetic-target">
                View Tech Specs
              </button>
            </div>
          </motion.div>

          <div className="relative h-[600px] lg:h-[800px]">
            <PhoneScene />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 blur-[150px] rounded-full -z-10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-32 container mx-auto px-4">
        <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase">Why Mobixa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px]">
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 glass-card rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden relative group"
          >
            <Truck className="w-16 h-16 text-primary mb-8 group-hover:translate-x-4 transition-transform duration-700" />
            <div>
              <h3 className="text-4xl font-black mb-4 uppercase">Global Logistics</h3>
              <p className="text-muted-foreground text-lg max-w-md italic">Next-gen delivery network. Get your premium tech within 24 hours in any major global hub.</p>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/40 transition-colors" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-[3rem] p-12 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Headphones className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight">Elite Support</h3>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">24/7 technical concierge</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-[3rem] p-12 flex flex-col space-y-4"
          >
            <Lock className="w-12 h-12 text-primary" />
            <h3 className="text-3xl font-black uppercase">Secure Ecosystem</h3>
            <p className="text-sm text-muted-foreground font-medium">End-to-end encrypted transactions and member privacy.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 glass-card rounded-[3rem] p-12 overflow-hidden relative group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-5xl font-black mb-2 uppercase tracking-tighter">Certified Authentic</h3>
                <p className="text-xl text-muted-foreground italic">Blockchain-verified originals. 2-Year Global Warranty.</p>
              </div>
              <ShieldCheck className="w-16 h-16 text-primary" />
            </div>
            <div className="mt-12 w-full h-40 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl border border-white/5 flex items-center justify-around">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 bg-white/10 h-12 rounded-full" />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections with Parallax */}
      <section className="py-32 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-6xl font-black tracking-tighter uppercase">Collections</h2>
            <Link href="/category/all" className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b border-primary/20">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative"
              >
                <Link href={`/category/${cat.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-[2.5rem] glass-card group-hover:border-primary/50 transition-all duration-700">
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[1500ms]"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50 * (idx + 1)]) }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10 z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">{cat.description}</span>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Arrivals Grid */}
      <section className="py-32 container mx-auto px-4">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="text-3xl font-black uppercase tracking-widest whitespace-nowrap">New In Stock</h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -15 }}
              className="glass-card rounded-[2.5rem] p-6 group transition-all duration-500"
            >
              <div className="aspect-square bg-white/5 rounded-[2rem] overflow-hidden mb-8 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{product.brand}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={cn("w-2 h-2 fill-current", i <= Math.floor(product.rating) ? "text-primary" : "text-white/10")} />)}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{product.name}</h3>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-3xl font-black tracking-tighter text-white">${product.price.toLocaleString()}</span>
                  <button className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all magnetic-target">
                    <ShoppingCart className="w-5 h-5 transition-transform group-active:scale-95" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-32 px-4 container mx-auto">
        <div className="glass-card rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-12 animate-bounce" />
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tighter">Elite Security</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "We don't just sell phones. We build secure portals to your digital life."
          </p>
          <button className="px-16 py-6 bg-white text-black rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-primary hover:text-white transition-all magnetic-target shadow-2xl shadow-white/10 hover:shadow-primary/40">
            Join the Resistance
          </button>
        </div>
      </section>
    </Layout>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
