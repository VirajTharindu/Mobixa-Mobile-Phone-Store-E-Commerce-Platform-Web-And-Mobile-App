import { Layout } from "@/components/Layout";
import { products } from "@/lib/data";
import { useRoute, useLocation, Link } from "wouter";
import { Star, Truck, ShieldCheck, ArrowRight, ShoppingBag, BarChart3, Columns } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import LiquidDistortion from "@/components/LiquidDistortion";
import { useStore } from "@/lib/store";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const product = products.find(p => p.id === params?.id);

  const { addToCart, toggleComparison, comparisonList } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);

  const isComparing = useMemo(() =>
    comparisonList.some(p => p.id === product?.id),
    [comparisonList, product]
  );

  const chartData = useMemo(() => ({
    labels: ['CPU', 'Battery', 'Camera', 'Build', 'Display'],
    datasets: [
      {
        label: product?.name,
        data: [95, 90, 98, 92, 97],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
      },
    ],
  }), [product]);

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#94a3b8', font: { size: 10, weight: 'bold' as const } },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  const images = [product.image, product.image, product.image, product.image];
  const storageOptions = [
    { size: "128GB", price: product.price - 100 },
    { size: "256GB", price: product.price },
    { size: "512GB", price: product.price + 200 },
  ];

  const handleAddToCart = () => {
    addToCart(
      product,
      product.colors[selectedColor],
      storageOptions[selectedStorage].size,
      selectedStorage === 2 ? "MAX PERFORMANCE" : undefined
    );
    setLocation("/cart");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Store</Link>
          <ArrowRight className="w-3 h-3" />
          <Link href="/category/smartphones" className="hover:text-primary transition-colors">{product.category}</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-start">
          {/* Gallery with Liquid Distortion */}
          <div className="space-y-8 sticky top-32">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass-card relative group">
              <LiquidDistortion image={images[activeImage]} />
              <div className="absolute top-8 left-8 p-4 glass-card rounded-2xl flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Interactive Preview</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all p-1",
                    activeImage === idx ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" : "border-white/5 bg-white/5 hover:border-white/20"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded-xl opacity-60 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-12">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 border border-primary/20 pulse-gold">
                  Titanium Grade
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.8] uppercase">{product.name}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium italic opacity-80">{product.description}</p>
              </div>
              <button
                onClick={() => toggleComparison(product)}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all",
                  isComparing ? "border-primary bg-primary/10 text-primary" : "border-white/5 bg-white/5 text-muted-foreground hover:border-white/20"
                )}
                title={isComparing ? "Remove from Compare" : "Add to Compare"}
              >
                <Columns className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Select Color</h3>
                <div className="flex gap-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={cn(
                        "w-10 h-10 rounded-full border-4 transition-all relative magnetic-target",
                        selectedColor === idx ? "border-primary scale-110 shadow-glow" : "border-white/10 hover:border-white/30"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center justify-center">
                <div className="w-full h-32">
                  <Radar data={chartData} options={chartOptions} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mt-2">Performance Atlas</span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Storage Matrix</h3>
              <div className="grid grid-cols-3 gap-4">
                {storageOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={cn(
                      "px-6 py-6 rounded-3xl border-2 text-center transition-all magnetic-target",
                      selectedStorage === idx
                        ? "border-primary bg-primary/10 text-white shadow-xl shadow-primary/20"
                        : "border-white/5 bg-white/5 hover:border-white/10 text-muted-foreground"
                    )}
                  >
                    <div className="font-black text-xl tracking-tighter mb-1">{opt.size}</div>
                    <div className="text-[10px] font-black uppercase opacity-60">${opt.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-blue-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:scale-[1.05] shadow-2xl shadow-primary/40 magnetic-target"
              >
                <ShoppingBag className="w-6 h-6" /> Deploy to Cart
              </button>
              <button className="flex-1 glass-card text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-white/10 magnetic-target">
                Fast Checkout
              </button>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-primary" /> Orbital Shipping
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-primary" /> Multi-Year Security
              </div>
            </div>
          </div>
        </div>

        {/* Technical deep dive section remains or gets updated similarly */}
      </div>
    </Layout>
  );
}
