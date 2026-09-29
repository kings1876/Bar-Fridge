import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const { setIsOrderModalOpen } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'G’day! Welcome to Bar Fridges For Sale Australia. I’m Dave from our Sydney technical team. Looking for an alfresco outdoor cooler, back-bar display, or need help sizing a space?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'How do I claim the 10% Crypto discount?',
    'Is freight really free to my suburb in Australia?',
    'What is the difference between indoor vs alfresco fridges?',
    'I need help choosing a fridge for my patio.'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thanks for asking! Our commercial units are stocked in Sydney, Melbourne, Brisbane and Perth with 100% Free Tailgate Freight. For any order placed via our Order Form with Cryptocurrency, a 10% direct discount is automatically deducted!";
      
      const lower = messageText.toLowerCase();
      if (lower.includes('crypto') || lower.includes('discount') || lower.includes('10%')) {
        reply = "Great news! When you checkout using Bitcoin (BTC), USDT, Ethereum, or Solana, you automatically receive 10% off the total price on our Order Form. No promo code needed!";
      } else if (lower.includes('shipping') || lower.includes('freight') || lower.includes('free') || lower.includes('deliver')) {
        reply = "Yes, freight is 100% FREE on all our fridges and freezers nationwide across Australia! We use specialized tailgate couriers with full transit insurance.";
      } else if (lower.includes('outdoor') || lower.includes('alfresco') || lower.includes('patio') || lower.includes('tropical')) {
        reply = "For Australian outdoor and BBQ spaces, we recommend our OutbackMaster (190L) or AlfrescoShield (230L). They are Tropical Class-T certified (tested up to 43°C) with heated glass that prevents condensation!";
      } else if (lower.includes('order') || lower.includes('buy')) {
        reply = "To place an order, simply add your fridge to the cart and click 'Proceed to Order Form'. We will process your order and dispatch within 24 hours.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] h-[520px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-sm">
                  BF
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Aussie Support Specialist</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">Online</span>
                </div>
                <div className="text-[11px] text-slate-400">Tawk.to Integration Ready • Typically replies in 1m</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="bg-sky-50 border-b border-sky-100 px-4 py-2 text-[11px] text-sky-900 flex items-center justify-between font-medium">
            <span>Free Shipping Australia-Wide • 10% Crypto Discount</span>
            <button 
              onClick={() => {
                setIsOpen(false);
                setIsOrderModalOpen(true);
              }}
              className="underline font-bold text-sky-700 hover:text-sky-900"
            >
              Order Form →
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-2.5 rounded-xl w-20 text-slate-400 shadow-2xs">
                <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-2 border-t border-slate-100 bg-white overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 shrink-0 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask about dimensions, outdoor ratings, crypto..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 hover:from-sky-500 hover:to-blue-700 text-white font-extrabold px-4 py-3 rounded-full shadow-xl shadow-sky-600/30 transition-all duration-200 hover:scale-105"
        aria-label="Open Live Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-white fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-sky-700"></span>
        </div>
        <span className="text-xs font-black tracking-wide hidden sm:inline">
          Live Chat Support
        </span>
        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">
          Online
        </span>
      </button>
    </div>
  );
};
