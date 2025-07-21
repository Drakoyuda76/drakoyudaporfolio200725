import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/ui/scroll-to-top";
import ChatAssistant from "@/components/ui/chat-assistant";
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Index from "./pages/Index";
import SolutionDetail from "./pages/SolutionDetail";
import AdminPanel from "./components/admin/AdminPanel";
import NotFound from "./pages/NotFound";

declare global {
  interface Window {
    sessionStart: number;
  }
}

const queryClient = new QueryClient();

function App() {
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
              <Route path="/" element={<HomePage />} />
              <Route path="/solucoes" element={<SolutionsPage />} />
              <Route path="/solucoes/:id" element={<SolutionDetail />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <ChatAssistant />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;