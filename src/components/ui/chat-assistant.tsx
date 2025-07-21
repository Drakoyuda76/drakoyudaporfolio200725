import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSolutions } from '@/data/solutions';
import type { Solution } from '@/types/solution';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0">
    <img 
      src="/lovable-uploads/eae753cf-d742-4daa-a23d-e1113b1cfa33.png" 
      alt="DrakoYuda Assistant" 
      className="w-5 h-5 object-contain"
    />
  </div>
);

const MessageBubble = ({ message }: { message: Message }) => (
  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
    {message.sender === 'assistant' && (
      <div className="mr-2 mt-1">
        <ChatAvatar />
      </div>
    )}
    <div
      className={`max-w-[80%] p-3 rounded-lg text-sm ${
        message.sender === 'user'
          ? 'bg-accent text-accent-foreground'
          : 'bg-muted text-foreground'
      }`}
    >
      <p className="whitespace-pre-wrap">{message.text}</p>
      <p className="text-xs opacity-70 mt-1">
        {message.timestamp.toLocaleTimeString('pt', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </p>
    </div>
  </div>
);

const QuickActions = ({ onActionSelect }: { onActionSelect: (action: string) => void }) => {
  const actions = [
    { id: 'solutions', emoji: '🚀', text: 'Ver Soluções', action: 'show_solutions' },
    { id: 'metrics', emoji: '📊', text: 'Impacto', action: 'show_impact' },
    { id: 'about', emoji: '🏢', text: 'Sobre Nós', action: 'show_about' },
    { id: 'contact', emoji: '📧', text: 'Contacto', action: 'show_contact' }
  ];

  return (
    <div className="p-3 bg-muted/30 border-t">
      <p className="text-xs text-muted-foreground mb-2">Acções rápidas:</p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map(action => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onActionSelect(action.action)}
            className="flex items-center space-x-1 text-xs h-8"
          >
            <span>{action.emoji}</span>
            <span>{action.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

const ChatResponseEngine = {
  responses: {
    greeting: [
      "Olá! 👋 Sou o assistente da DrakoYuda. Posso ajudar-te a explorar as nossas 10 soluções de IA inovadoras!",
      "Oi! 😊 Bem-vindo ao futuro da IA angolana! Como posso ajudar-te hoje?",
      "Olá! 🚀 Pronto para descobrir como a IA da DrakoYuda transforma negócios?"
    ],
    
    solutions_overview: [
      "Temos 10 soluções incríveis! 🌟 Desde Ana Lista (contabilidade) até BotBwala (WhatsApp IA). Qual área te interessa?",
      "O nosso portfólio cobre Front Office, Back Office e muito mais! Já poupámos 9.300+ horas e impactámos 4.300+ pessoas! 📊"
    ],
    
    ana_lista: "Ana Lista revoluciona a contabilidade angolana! 📊 Converte balancetes automaticamente, poupando 1.200 horas e servindo 150+ contabilistas. Quer saber mais?",
    
    botbwala: "BotBwala é IA no WhatsApp! 📱 Interface familiar para assistentes inteligentes. Já impactou 500 utilizadores! Interessante, não?",
    
    kendanet: "KendaNet conecta táxis comunitários! 🚗 Hub digital com IA para transporte local em Angola. Uma parceria que mudará mobilidade urbana!",
    
    contact: [
      "Para falar connosco: drakoyuda76@gmail.com 📧 Ou usa o formulário de contacto!",
      "Adoramos falar sobre IA! Email: drakoyuda76@gmail.com 🤝"
    ],
    
    demo: [
      "Explora clicando nas soluções! 🎭 Cada carta mostra detalhes completos, métricas e impacto real.",
      "Experimenta tudo! Modo escuro/claro, navegação suave, e o painel admin (logo + PIN 6516)! ✨"
    ],
    
    impact: [
      "Impacto real: 9.300+ horas poupadas, 4.300+ pessoas beneficiadas! 📈 Contribuímos para 5 ODS da ONU!",
      "Métricas impressionantes! Eficiência +85%, redução de erros, e inovação que transforma Angola! 🇦🇴"
    ]
  },

  detectIntent: (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('olá') || lowerMsg.includes('oi') || lowerMsg.includes('hello')) return 'greeting';
    if (lowerMsg.includes('ana lista') || lowerMsg.includes('contabilidade')) return 'ana_lista';
    if (lowerMsg.includes('botbwala') || lowerMsg.includes('whatsapp')) return 'botbwala';
    if (lowerMsg.includes('kendanet') || lowerMsg.includes('taxi')) return 'kendanet';
    if (lowerMsg.includes('soluções') || lowerMsg.includes('portfólio')) return 'solutions_overview';
    if (lowerMsg.includes('contacto') || lowerMsg.includes('email')) return 'contact';
    if (lowerMsg.includes('demo') || lowerMsg.includes('teste')) return 'demo';
    if (lowerMsg.includes('impacto') || lowerMsg.includes('métricas')) return 'impact';
    
    return 'general';
  },

  generateResponse: (intent: string): string => {
    const responses = ChatResponseEngine.responses[intent] || [
      "Interessante! 🤔 Explora o portfólio clicando nas soluções que te interessam!",
      "Boa pergunta! 💡 Usa as acções rápidas ou navega pelas nossas 10 soluções inovadoras!"
    ];
    
    return Array.isArray(responses) 
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;
  }
};

const ChatAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou o assistente da DrakoYuda. Posso ajudar-te a explorar as nossas soluções de IA inovadoras! Em que posso ajudar?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.classList.add('highlight-section');
      setTimeout(() => element.classList.remove('highlight-section'), 2000);
    }
  };

  const addMessage = (text: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    const userMessage = inputValue;
    setInputValue("");
    
    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      const intent = ChatResponseEngine.detectIntent(userMessage);
      const response = ChatResponseEngine.generateResponse(intent);
      addMessage(response, 'assistant');
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    let response = "";

    switch (action) {
      case 'show_solutions':
        message = "Mostrar soluções";
        response = "Aqui estão as nossas 10 soluções! 🚀 Cada uma resolve problemas reais com IA. Clica numa que te interesse!";
        scrollToSection('solucoes');
        break;
      case 'show_impact':
        message = "Ver impacto";
        response = "Vê estas métricas! 📊 9.300+ horas poupadas, 4.300+ pessoas impactadas. IA que transforma Angola!";
        scrollToSection('hero');
        break;
      case 'show_about':
        message = "Sobre a DrakoYuda";
        response = "Somos pioneiros em IA angolana! 🇦🇴 Criamos soluções que resolvem problemas reais com tecnologia avançada.";
        scrollToSection('sobre');
        break;
      case 'show_contact':
        message = "Como contactar";
        response = "Fácil! 📧 drakoyuda76@gmail.com ou usa o formulário abaixo. Adoramos falar sobre IA!";
        scrollToSection('contacto');
        break;
    }

    addMessage(message, 'user');
    setTimeout(() => addMessage(response, 'assistant'), 500);
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-110"
          aria-label="Abrir chat assistente"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 md:w-96 md:h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]">
      <div className="h-full flex flex-col bg-background border border-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-accent/80 p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChatAvatar />
            <div>
              <h3 className="text-accent-foreground font-semibold text-sm">Assistente DrakoYuda</h3>
              <p className="text-accent-foreground/80 text-xs">IA Especialista em Soluções</p>
            </div>
          </div>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-accent-foreground hover:bg-accent-foreground/20 p-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="mr-2 mt-1">
                <ChatAvatar />
              </div>
              <div className="bg-muted text-foreground p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick actions */}
        <QuickActions onActionSelect={handleQuickAction} />
        
        {/* Input area */}
        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pergunta algo sobre as nossas soluções..."
              className="flex-1 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-accent bg-background"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              size="sm"
              disabled={!inputValue.trim() || isTyping}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;