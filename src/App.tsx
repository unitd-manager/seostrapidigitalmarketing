import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
// import Packages from "./pages/Packages";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";
import TransportationCaseStudy from "./pages/case-studies/TransportationCaseStudy";
import HealthcareCaseStudy from "./pages/case-studies/HealthcareCaseStudy";
//import ManufacturingCaseStudy from "./pages/case-studies/ManufacturingCaseStudy";
import { CartProvider } from "./context/CartContext";
import DynamicPage from "./pages/DynamicPage";

const queryClient = new QueryClient();

// Inner component has access to Router context (needed for useNavigate)
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* <Route path="/packages" element={<Packages />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
      path="/case-studies/transportation-seo-growth"
      element={<TransportationCaseStudy />}
    />
    <Route
      path="/case-studies/healthcare-seo-growth"
      element={<HealthcareCaseStudy />}
    />
   {/* <Route
      path="/case-studies/manufacturing-seo-growth"
      element={<ManufacturingCaseStudy />}
    />*/}
    <Route path="/:slug" element={<DynamicPage />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
