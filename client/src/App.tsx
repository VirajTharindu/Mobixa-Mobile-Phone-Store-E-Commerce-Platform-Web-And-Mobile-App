import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Category from "@/pages/Category";
import Compare from "@/pages/Compare";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/category/:category" component={Category} />
      <Route path="/compare" component={Compare} />
      <Route path="/cart" component={Cart} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

import MagneticCursor from "@/components/MagneticCursor";
import SmoothScroll from "@/components/SmoothScroll";
import AnimatedSVGLoader from "@/components/AnimatedSVGLoader";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AnimatedSVGLoader />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MagneticCursor />
        <SmoothScroll>
          <Router />
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
