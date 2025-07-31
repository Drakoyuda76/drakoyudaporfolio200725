import React, { useState, useEffect } from 'react';

interface ChatbotLoaderProps {
  src: string;
}

const ChatbotLoader: React.FC<ChatbotLoaderProps> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Preload the iframe content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for max 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className="fixed bottom-4 right-4" 
      style={{ 
        zIndex: 9999, 
        position: 'fixed',
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      {isLoading && (
        <div 
          className="flex items-center justify-center bg-forest-600 text-white rounded-lg shadow-lg"
          style={{ width: '500px', height: '650px' }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-sm">A carregar chatbot...</p>
          </div>
        </div>
      )}
      
      <iframe 
        src={src}
        style={{ 
          width: '500px', 
          height: '650px', 
          border: 'none',
          display: isLoading ? 'none' : 'block'
        }}
        allow="microphone; camera; fullscreen"
        loading="eager"
        title="BotBwala Chatbot"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {hasError && (
        <div 
          className="flex items-center justify-center bg-red-500 text-white rounded-lg shadow-lg"
          style={{ width: '500px', height: '650px' }}
        >
          <div className="text-center">
            <p className="text-sm">Erro ao carregar chatbot</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-white text-red-500 rounded hover:bg-gray-100"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotLoader;