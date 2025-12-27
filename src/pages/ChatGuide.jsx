import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Sparkles } from 'lucide-react';
import ChatBubble, { TypingIndicator } from '../components/ChatBubble';

const ChatGuide = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Vanakkam! 🙏 I'm your AI guide for Tirunelveli. Ask me anything about temples, waterfalls, food, culture, or travel tips!",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    'Best time to visit Courtallam?',
    'Where to try authentic Tirunelveli Halwa?',
    'Temple visiting hours?',
    'How to reach Papanasam Dam?',
  ];

  const mockResponses = {
    default: "That's a great question! Tirunelveli has so much to offer. Let me help you with specific recommendations based on your interests.",
    temple: "The Nellaiappar Temple is open from 5:00 AM to 12:00 PM and 4:00 PM to 9:00 PM. Don't miss the musical pillars and intricate carvings!",
    halwa: "For authentic Tirunelveli Halwa, visit the shops near Nellaiappar Temple. Iruttu Kadai (Dark Shop) is the most famous one!",
    courtallam: "The best time to visit Courtallam is during monsoon (June to September) when the waterfalls are at their most majestic!",
    dam: "Papanasam Dam is about 50 km from Tirunelveli city. You can hire a taxi or take a bus. It's a beautiful spot for picnics!",
  };

  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('temple') || msg.includes('visiting hours')) return mockResponses.temple;
    if (msg.includes('halwa')) return mockResponses.halwa;
    if (msg.includes('courtallam') || msg.includes('waterfall')) return mockResponses.courtallam;
    if (msg.includes('dam') || msg.includes('papanasam')) return mockResponses.dam;
    return mockResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      message: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse = {
        id: messages.length + 2,
        message: getResponse(inputValue),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen pt-20 pb-6">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center text-3xl glow"
            >
              🤖
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-bold gradient-text mb-4">
            AI Travel Guide
          </h1>
          <p className="text-white/70 text-lg">
            Your personal assistant for exploring Tirunelveli
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card h-[600px] flex flex-col"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.message}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-white/60 mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-gold" />
                Popular questions:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="glass p-3 rounded-lg text-sm text-left hover:bg-purple-500/20 transition-all"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about Tirunelveli..."
                className="input flex-1"
              />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass-card p-3 rounded-full"
              >
                <Mic size={20} className="text-purple-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="btn btn-primary"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatGuide;
