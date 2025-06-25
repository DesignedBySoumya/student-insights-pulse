
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BattleAnalysis from "./pages/BattleAnalysis";
import PTSReportCard from "./pages/PTSReportCard";
import CompareMocks from "./pages/CompareMocks";
import ReviewWeakChapters from "./pages/ReviewWeakChapters";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/battle-analysis" element={<BattleAnalysis />} />
          <Route path="/pts-report-card" element={<PTSReportCard />} />
          <Route path="/compare-mocks" element={<CompareMocks />} />
          <Route path="/review-weak-chapters" element={<ReviewWeakChapters />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
