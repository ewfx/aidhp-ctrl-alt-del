import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../lib/utils';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm your AI banking assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isBot: false }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm here to help! While I'm in demo mode, I can provide general banking information and guidance.",
        isBot: true
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#D71E28] text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
      >
        <MessageSquare />
      </button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed bottom-[100px] right-4 w-[400px] bg-white rounded-lg shadow-xl">
            <Dialog.Title className="sr-only">AI Banking Assistant Chat</Dialog.Title>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">AI Banking Assistant</h3>
              <Dialog.Close className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </Dialog.Close>
            </div>
            
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-[#D71E28] text-white ml-auto"
                  )}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D71E28]"
                />
                <button
                  onClick={handleSend}
                  className="p-2 text-[#D71E28] hover:text-red-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}