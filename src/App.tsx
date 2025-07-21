import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/ui/scroll-to-top";
import ChatAssistant from "@/components/ui/chat-assistant";
import Index from "./pages/Index";
import SolutionDetail from "./pages/SolutionDetail";
import AdminPanel from "./components/admin/AdminPanel";
import NotFound from "./pages/NotFound";

// Extend Window interface for session tracking
declare global {
  interface Window {
    sessionStart: number;
  }
}

const queryClient = new QueryClient();

const App = () => {
  // Track session for chat context
  React.useEffect(() => {
    if (!window.sessionStart) {
      window.sessionStart = Date.now();
      localStorage.setItem('drakoyuda_visited', 'true');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solution/:id" element={<SolutionDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <ChatAssistant />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;