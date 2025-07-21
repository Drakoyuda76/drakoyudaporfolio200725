
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "@/components/ui/scroll-to-top";
import ChatAssistant from "@/components/ui/chat-assistant";
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SolutionDetail from "./pages/SolutionDetail";
import AdminPanel from "./components/admin/AdminPanel";
import NotFound from "./pages/NotFound";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    sessionStart: number;
  }
}

const queryClient = new QueryClient();

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Oops! Algo correu mal
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Ocorreu um erro inesperado. Por favor, tenta novamente.
      </p>
      <div className="space-y-3">
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Tentar Novamente
        </button>
        <Link
          to="/"
          className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  </div>
);

function App() {
  React.useEffect(() => {
    if (!window.sessionStart) {
      window.sessionStart = Date.now();
      localStorage.setItem('drakoyuda_visited', 'true');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <TooltipProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
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
            </ErrorBoundary>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
