import { motion } from 'framer-motion';
import { chatBubbleLeft, chatBubbleRight } from '../utils/animations';

const ChatBubble = ({ message, isUser, timestamp }) => {
  return (
    <motion.div
      {...(isUser ? chatBubbleRight : chatBubbleLeft)}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center glow">
              <span className="text-sm">🤖</span>
            </div>
            <span className="text-xs text-white/60">AI Guide</span>
          </div>
        )}

        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`glass-card ${
            isUser
              ? 'bg-gradient-to-br from-purple-500/20 to-teal-500/20 border-purple-500/30'
              : 'bg-white/5'
          }`}
        >
          <p className="text-white/90 leading-relaxed">{message}</p>
          
          {timestamp && (
            <div className="mt-2 text-xs text-white/40">
              {timestamp}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="glass-card flex items-center gap-2 px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
          ))}
        </div>
        <span className="text-sm text-white/60">AI is typing...</span>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
