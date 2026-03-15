import { Layout } from "@/components/Layout";
import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { X, Check, Share2, Plus, Columns } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Compare() {
  const [highlightDiff, setHighlightDiff] = useState(true);
  const { comparisonList, removeFromComparison } = useStore();

  if (comparisonList.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-8">
          <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
            <Columns className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase mb-2">Nothing to compare</h2>
            <p className="text-muted-foreground mb-8">Select up to 3 models from the store to analyze technical differences.</p>
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

  const specs = [
    {
      category: "DISPLAY", items: [
        { name: "Main Display", key: "Display" },
        { name: "Refresh Rate", key: "Refresh Rate" }
      ]
    },
    {
      category: "PERFORMANCE", items: [
        { name: "Processor", key: "Processor" },
        { name: "Battery", key: "Battery" }
      ]
    },
    {
      category: "IMAGING", items: [
        { name: "Main System", key: "Main Camera" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-4">Core Analysis</div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">Technical Matrix</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-2 px-4 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Highlight Gaps</span>
              <div
                className={cn("w-12 h-6 rounded-full relative cursor-pointer transition-all p-1", highlightDiff ? "bg-primary shadow-glow-sm" : "bg-white/10")}
                onClick={() => setHighlightDiff(!highlightDiff)}
              >
                <div className={cn("absolute w-4 h-4 bg-white rounded-full transition-all shadow-md", highlightDiff ? "left-7" : "left-1")} />
              </div>
            </div>

            <Link href="/">
              <button className="flex items-center gap-3 bg-white text-black hover:bg-primary hover:text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl group">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Device
              </button>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/5">
            <div className="p-8 border-r border-white/5 flex items-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              Attribute Grid
            </div>

            {comparisonList.map((p) => (
              <div key={p.id} className="p-8 border-r border-white/5 relative group bg-white/[0.01]">
                <button
                  onClick={() => removeFromComparison(p.id)}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-muted-foreground hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="aspect-square w-48 mx-auto mb-8 bg-white/5 rounded-[2rem] p-6 flex items-center justify-center relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{p.brand}</span>
                <h3 className="font-black text-2xl uppercase tracking-tighter mb-4">{p.name}</h3>
                <div className="font-black text-3xl tracking-tighter text-white/90 mb-6">${p.price.toLocaleString()}</div>
                <Link href={`/product/${p.id}`}>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                    View Project
                  </button>
                </Link>
              </div>
            ))}

            {[...Array(Math.max(0, 3 - comparisonList.length))].map((_, i) => (
              <div key={i} className="p-8 flex flex-col items-center justify-center text-center opacity-30 group">
                <Link href="/" className="w-20 h-20 rounded-[2rem] border-2 border-dashed border-white/10 flex items-center justify-center mb-6 text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-pointer hover:bg-white/5">
                  <Plus className="w-8 h-8 group-hover:scale-125 transition-transform" />
                </Link>
                <p className="text-[10px] font-black uppercase tracking-widest">Available slot</p>
              </div>
            ))}
          </div>

          {/* Specs Rows */}
          {specs.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="bg-white/[0.03] px-8 py-4 text-[10px] font-black text-primary uppercase tracking-[0.4em] border-b border-white/5">
                {section.category}
              </div>
              {section.items.map((item, iIdx) => {
                const values = comparisonList.map(p => p.specs[p.specs[item.key] ? item.key : Object.keys(p.specs).find(k => k.includes(item.key)) || ""] || "-");
                const isAllSame = values.every(v => v === values[0]);
                const isDiff = highlightDiff && !isAllSame;

                return (
                  <div key={iIdx} className="grid grid-cols-1 md:grid-cols-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="p-8 border-r border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {item.name}
                    </div>
                    {comparisonList.map((p, pIdx) => (
                      <div key={p.id} className={cn("p-8 border-r border-white/5 text-sm font-black uppercase tracking-tighter", isDiff && "text-primary bg-primary/5 italic")}>
                        {p.specs[item.key] || p.specs[Object.keys(p.specs).find(k => k.includes(item.key)) || ""] || "-"}
                      </div>
                    ))}
                    {[...Array(Math.max(0, 3 - comparisonList.length))].map((_, i) => (
                      <div key={i} className="p-8 text-center text-muted-foreground font-black opacity-10">---</div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Expert Verdict */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-black/40 border-t border-white/5">
            <div className="glass-card border-white/5 rounded-[2rem] p-8 bg-white/[0.02]">
              <h4 className="font-black flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest">
                <div className="w-5 h-5 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] text-white">✓</div>
                Expert Consensus
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Our automated analysis suggests the high-density OLED systems in the <span className="text-primary font-black uppercase">Titanium</span> series provide superior visual fidelity for professional workflows."
              </p>
            </div>

            <div className="glass-card border-white/5 rounded-[2rem] p-8 bg-white/[0.02]">
              <h4 className="font-black flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest">
                <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center text-[10px] text-white">↗</div>
                Market Trajectory
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Price stability is forecasted at 98% for the next quarter. Professional grade upgrades are recommended before the Q3 logistics shift.
              </p>
            </div>

            <div className="glass-card border-white/5 rounded-[2rem] p-8 bg-white/[0.02]">
              <h4 className="font-black flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest text-primary">
                <Check className="w-5 h-5" /> Ready for Deployment
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All compared units are currently available for immediate orbital shipping from our secure neutral zones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
