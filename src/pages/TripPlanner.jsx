import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Calendar, MapPin, Clock } from 'lucide-react';
import ChatBubble, { TypingIndicator } from '../components/ChatBubble';

const TripPlanner = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello! I'm your AI trip planner for Tirunelveli. I can help you create the perfect itinerary based on your interests, time, and preferences. How many days are you planning to visit?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickSuggestions = [
    '2 days trip',
    'Temples only',
    'Nature & waterfalls',
    'Family friendly',
  ];

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
        message: "Great choice! I've created a personalized 2-day itinerary for you. Check out the plan below with temples, waterfalls, and local cuisine experiences.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiResponse]);
      
      // Generate itinerary
      setGeneratedItinerary({
        days: [
          {
            day: 1,
            title: 'Temples & Culture',
            locations: [
              { name: 'Nellaiappar Temple', time: '9:00 AM', duration: '2 hours' },
              { name: 'Tirunelveli Halwa Shops', time: '12:00 PM', duration: '1 hour' },
              { name: 'Thamirabarani River', time: '4:00 PM', duration: '1.5 hours' },
            ],
          },
          {
            day: 2,
            title: 'Nature & Adventure',
            locations: [
              { name: 'Courtallam Waterfalls', time: '8:00 AM', duration: '3 hours' },
              { name: 'Papanasam Dam', time: '1:00 PM', duration: '2 hours' },
              { name: 'Manimuthar Falls', time: '4:00 PM', duration: '2 hours' },
            ],
          },
        ],
      });
    }, 2000);
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen pt-20 pb-6">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            AI Trip Planner
          </h1>
          <p className="text-white/70 text-lg">
            Let AI create your perfect Tirunelveli itinerary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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

              {/* Quick Suggestions - Fixed layout */}
              {messages.length <= 2 && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-white/60 mb-3">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-3">
                    {quickSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="px-4 py-2 rounded-full glass-card text-sm font-medium text-white hover:bg-white/10 transition-all"
                        style={{
                          border: '1px solid rgba(138, 43, 226, 0.3)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {suggestion}
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
                    placeholder="Describe your ideal trip..."
                    className="input flex-1"
                  />
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

          {/* Itinerary Display */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card"
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-gold" size={24} />
                <h2 className="text-xl font-bold gradient-text">Your Itinerary</h2>
              </div>

              {generatedItinerary ? (
                <div className="space-y-6">
                  {generatedItinerary.days.map((day) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: day.day * 0.2 }}
                      className="glass p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="font-semibold gradient-text-gold">{day.title}</h3>
                      </div>

                      <div className="space-y-3">
                        {day.locations.map((location, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-0"
                          >
                            <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-teal-500 rounded-full" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{location.name}</h4>
                              <div className="flex items-center gap-3 text-xs text-white/60">
                                <div className="flex items-center gap-1">
                                  <Clock size={12} className="text-teal-400" />
                                  <span>{location.time}</span>
                                </div>
                                <span>•</span>
                                <span>{location.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-gold w-full"
                  >
                    <Sparkles size={18} />
                    Save Itinerary
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-white/60 text-sm">
                    Your personalized itinerary will appear here
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
