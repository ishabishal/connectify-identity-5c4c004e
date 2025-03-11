import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  Smile, 
  MoreVertical, 
  Phone,
  VideoIcon,
  Check,
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import Button from '@/components/Button';
import { toast } from 'sonner';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    name: 'Jamie',
    lastMessage: 'Hey, how are you doing today?',
    avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    unread: 2,
    online: true,
    lastActive: 'just now',
    verified: true,
  },
  {
    id: '2',
    name: 'Alex',
    lastMessage: 'Would you like to grab coffee sometime?',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    unread: 0,
    online: false,
    lastActive: '30 min ago',
    verified: true,
  },
  {
    id: '3',
    name: 'Taylor',
    lastMessage: 'I love that band too! Have you seen them live?',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    unread: 0,
    online: false,
    lastActive: '2 hours ago',
    verified: false,
  },
  {
    id: '4',
    name: 'Jordan',
    lastMessage: 'What part of town do you live in?',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604',
    unread: 1,
    online: true,
    lastActive: 'just now',
    verified: true,
  },
];

// Mock messages for the current conversation
const mockMessages = [
  {
    id: 'm1',
    senderId: '1', // Jamie
    text: 'Hey there! I saw we matched and wanted to say hi.',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    status: 'read', // 'sent', 'delivered', 'read'
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Hi Jamie! Thanks for reaching out. How are you doing today?',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    status: 'read',
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'I\'m doing well! Just finished work and relaxing a bit. What about you?',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    status: 'read',
  },
  {
    id: 'm4',
    senderId: 'me',
    text: 'Same here! Had a busy day but finally getting some downtime. I noticed you like hiking from your profile - been on any good trails lately?',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    status: 'read',
  },
  {
    id: 'm5',
    senderId: '1',
    text: 'Yes! I went to Mount Rainier last weekend. The views were incredible! I\'d love to tell you more about it sometime. Do you hike often?',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'read',
  },
];

// Format timestamp to a readable format
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: 'long' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

// Message status icon component
const MessageStatus = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
  if (status === 'sent') {
    return <Check size={14} className="text-muted-foreground" />;
  } else if (status === 'delivered') {
    return <CheckCheck size={14} className="text-muted-foreground" />;
  } else {
    return <CheckCheck size={14} className="text-brand-500" />;
  }
};

const Messages = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(conversationId || null);
  const [conversations, setConversations] = useState(mockConversations);
  const [currentMessages, setCurrentMessages] = useState(mockMessages);
  
  // Find the current conversation details
  const currentConversation = conversations.find(c => c.id === activeConversation);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `m${currentMessages.length + 1}`,
      senderId: 'me',
      text: message,
      timestamp: new Date().toISOString(),
      status: 'sent' as 'sent' | 'delivered' | 'read',
    };
    
    setCurrentMessages([...currentMessages, newMessage]);
    setMessage('');
    
    // Simulate message being delivered
    setTimeout(() => {
      setCurrentMessages(prev => 
        prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' as 'sent' | 'delivered' | 'read' } : m)
      );
    }, 1000);
    
    // Simulate message being read
    setTimeout(() => {
      setCurrentMessages(prev => 
        prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' as 'sent' | 'delivered' | 'read' } : m)
      );
    }, 2500);
    
    // Simulate reply for demo purposes
    if (activeConversation) {
      setTimeout(() => {
        const replyTexts = [
          "That's interesting! Tell me more.",
          "I'd love to hear more about that.",
          "That sounds great! When are you free?",
          "I feel the same way about that too!",
          "Thanks for sharing, I appreciate it."
        ];
        
        const randomReply = replyTexts[Math.floor(Math.random() * replyTexts.length)];
        
        const reply = {
          id: `m${currentMessages.length + 2}`,
          senderId: activeConversation,
          text: randomReply,
          timestamp: new Date().toISOString(),
          status: 'read' as 'sent' | 'delivered' | 'read',
        };
        
        setCurrentMessages(prev => [...prev, reply]);
        
        // Update conversation with latest message
        setConversations(prev => 
          prev.map(c => c.id === activeConversation ? { ...c, lastMessage: randomReply, unread: 0 } : c)
        );
        
        toast.success("New message received");
      }, 5000);
    }
  };
  
  const handleConversationClick = (id: string) => {
    setActiveConversation(id);
    navigate(`/messages/${id}`);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    );
  };
  
  const handleBackToList = () => {
    setActiveConversation(null);
    navigate('/messages');
  };
  
  const handlePhoneClick = () => {
    toast("Calling feature coming soon!", {
      description: "Voice calls will be available in the full version.",
    });
  };
  
  const handleVideoClick = () => {
    toast("Video chat feature coming soon!", {
      description: "Video calls will be available in the full version.",
    });
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-brand-50/50">
        <Navbar />
        
        <div className="container max-w-6xl px-4 pt-28 pb-16">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-3 h-[70vh]">
              {/* Conversation List - hidden on mobile when conversation is active */}
              <div className={`border-r border-gray-100 ${activeConversation ? 'hidden md:block' : ''}`}>
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold">Messages</h2>
                  <p className="text-sm text-muted-foreground">Connect with your matches</p>
                </div>
                
                <div className="overflow-y-auto h-[calc(70vh-76px)]">
                  {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                        <Send size={24} className="text-brand-500" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Match with someone to start a conversation
                      </p>
                      <Button 
                        onClick={() => navigate('/dashboard')}
                        variant="outline"
                      >
                        Find Matches
                      </Button>
                    </div>
                  ) : (
                    <ul>
                      {conversations.map((conversation) => (
                        <li 
                          key={conversation.id} 
                          className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors hover:bg-brand-50 ${
                            activeConversation === conversation.id ? 'bg-brand-50' : ''
                          }`}
                          onClick={() => handleConversationClick(conversation.id)}
                        >
                          <div className="relative">
                            <div className={`h-12 w-12 rounded-full bg-gray-200 overflow-hidden ${conversation.unread > 0 ? 'ring-2 ring-brand-500' : ''}`}>
                              <img 
                                src={conversation.avatar} 
                                alt={conversation.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            {conversation.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-medium truncate flex items-center">
                                {conversation.name}
                                {conversation.verified && (
                                  <span className="ml-1 text-brand-500">
                                    <Check size={14} className="inline" />
                                  </span>
                                )}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {conversation.lastActive}
                              </span>
                            </div>
                            <p className={`text-sm truncate ${conversation.unread > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread > 0 && (
                            <div className="h-5 w-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center">
                              {conversation.unread}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Chat Area or Empty State */}
              <div className={`md:col-span-2 flex flex-col ${!activeConversation ? 'hidden md:flex' : ''}`}>
                {activeConversation ? (
                  // Active Conversation
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center">
                      <button 
                        className="md:hidden mr-2 p-1 rounded hover:bg-secondary"
                        onClick={handleBackToList}
                      >
                        <ArrowLeft size={20} />
                      </button>
                      
                      {currentConversation && (
                        <div className="flex items-center flex-1">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                            <img 
                              src={currentConversation.avatar} 
                              alt={currentConversation.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium flex items-center">
                              {currentConversation.name}
                              {currentConversation.verified && (
                                <span className="ml-1 text-brand-500">
                                  <Check size={14} className="inline" />
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {currentConversation.online ? 'Online' : `Last active ${currentConversation.lastActive}`}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 rounded hover:bg-secondary"
                          onClick={handlePhoneClick}
                        >
                          <Phone size={20} />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-secondary"
                          onClick={handleVideoClick}
                        >
                          <VideoIcon size={20} />
                        </button>
                        <button className="p-2 rounded hover:bg-secondary">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {currentMessages.map((msg) => {
                        const isSentByMe = msg.senderId === 'me';
                        return (
                          <div 
                            key={msg.id} 
                            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex flex-col max-w-[75%]">
                              <div 
                                className={`px-4 py-2 rounded-2xl ${
                                  isSentByMe 
                                    ? 'bg-brand-500 text-white rounded-tr-none' 
                                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                }`}
                              >
                                <p>{msg.text}</p>
                              </div>
                              <div className={`flex items-center mt-1 text-xs ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
                                <span className="text-muted-foreground mr-1">
                                  {formatTime(msg.timestamp)}
                                </span>
                                {isSentByMe && <MessageStatus status={msg.status} />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded hover:bg-secondary">
                          <ImageIcon size={20} className="text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded hover:bg-secondary">
                          <Smile size={20} className="text-muted-foreground" />
                        </button>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-brand-300"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          variant={message.trim() ? 'primary' : 'secondary'}
                          disabled={!message.trim()}
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Empty State
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare size={32} className="text-brand-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                      Select a conversation to start chatting or find new matches to connect with
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                    >
                      Find Matches
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Messages;
