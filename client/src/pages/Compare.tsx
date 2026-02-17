import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { Link } from "wouter";
import { X, Check, Share2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SpecItem {
  name: string;
  k1?: string;
  k2?: string;
  v1?: string;
  v2?: string;
  icon?: boolean;
  diff?: boolean;
  iconDiff?: boolean;
}

interface SpecSection {
  category: string;
  items: SpecItem[];
}

export default function Compare() {
  const [highlightDiff, setHighlightDiff] = useState(true);
  const p1 = products[2]; // iPhone
  const p2 = products[1]; // S24

  const specs: SpecSection[] = [
    { category: "DISPLAY", items: [
      { name: "Screen Size", k1: "Display", k2: "Display" },
      { name: "Resolution", v1: "2796 x 1290 (460 ppi)", v2: "3120 x 1440 (505 ppi)" },
      { name: "Refresh Rate", v1: "120Hz ProMotion", v2: "120Hz LTPO" }
    ]},
    { category: "PERFORMANCE", items: [
      { name: "Chipset", k1: "Processor", k2: "Processor" },
      { name: "RAM", v1: "8GB LPDDR5X", v2: "12GB LPDDR5X" }
    ]},
    { category: "CAMERA", items: [
      { name: "Main Sensor", k1: "Main Camera", k2: "Main Camera" },
      { name: "Optical Zoom", v1: "5x Optical", v2: "10x Optical Dual" }
    ]},
    { category: "BATTERY & FEATURES", items: [
      { name: "Battery Capacity", k1: "Battery", k2: "Battery" },
      { name: "Wireless Charging", v1: "MagSafe (15W)", v2: "Fast Wireless (15W)", icon: true },
      { name: "Stylus Support", v1: "Not available", v2: "S Pen Included", diff: true, iconDiff: true }
    ]}
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Home › Phones › Comparison</div>
            <h1 className="text-3xl font-bold mb-2">Compare Smartphones</h1>
            <p className="text-muted-foreground">Analyze technical specifications side-by-side to find the perfect flagship for your needs.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary/30 rounded-full p-1 pr-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors", 
                highlightDiff ? "bg-primary text-white" : "text-muted-foreground"
              )}>
                Highlight Differences
              </span>
              <div 
                className={cn("w-10 h-5 rounded-full relative cursor-pointer transition-colors", highlightDiff ? "bg-primary" : "bg-white/20")}
                onClick={() => setHighlightDiff(!highlightDiff)}
              >
                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", highlightDiff ? "left-6" : "left-1")} />
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-secondary/30 hover:bg-secondary/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Device
            </button>
          </div>
        </div>

        <div className="bg-card/50 border border-white/5 rounded-2xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-4 border-b border-white/5">
            <div className="p-6 border-r border-white/5 flex items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Attribute
            </div>
            
            <div className="p-6 border-r border-white/5 relative">
              <button className="absolute top-4 right-4 text-muted-foreground hover:text-white"><X className="w-4 h-4" /></button>
              <div className="aspect-square w-32 mx-auto mb-6 bg-white/5 rounded-lg p-2 flex items-center justify-center">
                 <img src={p1.image} alt={p1.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-bold text-lg">{p1.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{p1.brand}</p>
              <div className="font-bold text-primary text-xl mb-4">${p1.price.toLocaleString()}</div>
              <button className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Buy Now
              </button>
            </div>
            
            <div className="p-6 border-r border-white/5 relative bg-white/[0.02]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-b-lg">
                TOP PICK
              </div>
              <button className="absolute top-4 right-4 text-muted-foreground hover:text-white"><X className="w-4 h-4" /></button>
              <div className="aspect-square w-32 mx-auto mb-6 bg-white/5 rounded-lg p-2 flex items-center justify-center">
                 <img src={p2.image} alt={p2.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-bold text-lg">{p2.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{p2.brand}</p>
              <div className="font-bold text-primary text-xl mb-4">${p2.price.toLocaleString()}</div>
              <button className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Buy Now
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-4 text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground">Add device</p>
            </div>
          </div>

          {/* Specs Rows */}
          {specs.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="bg-secondary/20 px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-white/5">
                {section.category}
              </div>
              {section.items.map((item, iIdx) => {
                const val1 = item.v1 || (item.k1 ? p1.specs[item.k1] : "-");
                const val2 = item.v2 || (item.k2 ? p2.specs[item.k2] : "-");
                const isDiff = highlightDiff && val1 !== val2;

                return (
                  <div key={iIdx} className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="p-6 border-r border-white/5 text-sm text-muted-foreground font-medium">
                      {item.name}
                    </div>
                    <div className="p-6 border-r border-white/5 text-sm font-medium flex items-center gap-2">
                      {item.iconDiff && item.name === "Stylus Support" ? (
                         <><X className="w-4 h-4 text-muted-foreground" /> <span className="text-muted-foreground italic">Not available</span></>
                      ) : (
                         <>
                           {item.icon && <Check className="w-4 h-4 text-emerald-500" />}
                           <span>{val1}</span>
                         </>
                      )}
                    </div>
                    <div className={cn("p-6 border-r border-white/5 text-sm font-medium flex items-center gap-2", isDiff && "bg-primary/5")}>
                       {item.icon && <Check className="w-4 h-4 text-emerald-500" />}
                       <span>{val2}</span>
                    </div>
                    <div className="p-6 text-sm text-muted-foreground text-center">-</div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Expert Verdict */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-secondary/10 border-t border-white/5">
             <div className="border border-white/10 rounded-xl p-4 bg-background">
               <h4 className="font-bold flex items-center gap-2 mb-2 text-sm">
                 <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">✓</div>
                 Expert Verdict
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Based on current specs, the <span className="text-primary hover:underline cursor-pointer">Galaxy S24 Ultra</span> offers a more comprehensive hardware package, particularly in camera versatility and display brightness.
               </p>
             </div>

             <div className="border border-white/10 rounded-xl p-4 bg-background">
               <h4 className="font-bold flex items-center gap-2 mb-2 text-sm">
                 <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">↗</div>
                 Price History
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Both devices are currently at MSRP. We expect the first significant price cuts for the Galaxy series in approximately 3 months based on seasonal trends.
               </p>
             </div>

             <div className="border border-white/10 rounded-xl p-4 bg-background">
               <h4 className="font-bold flex items-center gap-2 mb-2 text-sm">
                 <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">🚚</div>
                 Availability
               </h4>
               <div className="text-xs text-muted-foreground space-y-1 mt-2">
                 <div className="flex justify-between">
                   <span>iPhone 15 Pro Max:</span>
                   <span className="text-emerald-500 font-medium">In Stock</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Galaxy S24 Ultra:</span>
                   <span className="text-orange-400 font-medium">Ships in 2 days</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
