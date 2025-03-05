
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Send, Phone, Video, Info, MoreVertical } from 'lucide-react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock conversations data
const conversationsData = [
  {
    id: 'conv1',
    user: {
      id: 'user2',
      name: 'Emma Smith',
      username: 'emmasmith',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isOnline: true,
    },
    lastMessage: {
      text: 'Sounds great! Looking forward to it.',
      timestamp: '10:32 AM',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv2',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?img=8',
      isOnline: false,
    },
    lastMessage: {
      text: 'Did you see the latest updates to the project?',
      timestamp: 'Yesterday',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 'conv3',
    user: {
      id: 'user4',
      name: 'Sophie Williams',
      username: 'sophiew',
      avatar: 'https://i.pravatar.cc/150?img=9',
      isOnline: true,
    },
    lastMessage: {
      text: 'I just shared some photos from the event',
      timestamp: 'Yesterday',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv4',
    user: {
      id: 'user5',
      name: 'Michael Brown',
      username: 'mikebrown',
      avatar: 'https://i.pravatar.cc/150?img=12',
      isOnline: false,
    },
    lastMessage: {
      text: 'Thanks for your help with the project!',
      timestamp: 'Monday',
      isRead: true,
    },
    unreadCount: 0,
  },
];

// Mock messages for a conversation
const messagesData = [
  {
    id: 'msg1',
    sender: 'user2',
    text: 'Hey, how are you doing?',
    timestamp: '10:20 AM',
  },
  {
    id: 'msg2',
    sender: 'currentUser',
    text: 'I\'m good! Just working on some new designs. How about you?',
    timestamp: '10:22 AM',
  },
  {
    id: 'msg3',
    sender: 'user2',
    text: 'Not bad! I\'ve been busy with client meetings all morning.',
    timestamp: '10:25 AM',
  },
  {
    id: 'msg4',
    sender: 'user2',
    text: 'By the way, are you free for a coffee this weekend? Would love to catch up in person.',
    timestamp: '10:26 AM',
  },
  {
    id: 'msg5',
    sender: 'currentUser',
    text: 'That sounds great! I\'m free on Saturday afternoon. How about that new café downtown?',
    timestamp: '10:30 AM',
  },
  {
    id: 'msg6',
    sender: 'user2',
    text: 'Sounds great! Looking forward to it.',
    timestamp: '10:32 AM',
  },
];

const Messages = () => {
  const { conversationId } = useParams();
  const [activeConversation, setActiveConversation] = useState<string | null>(conversationId || null);
  const [conversations, setConversations] = useState(conversationsData);
  const [messages, setMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Find current conversation
  const currentConversation = conversations.find(conv => conv.id === activeConversation);
  
  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(search.toLowerCase())
  );
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg = {
      id: `msg${Date.now()}`,
      sender: 'currentUser',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Update last message in conversations
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? {
              ...conv,
              lastMessage: {
                text: newMessage,
                timestamp: 'Just now',
                isRead: true,
              },
            }
          : conv
      )
    );
  };
  
  const selectConversation = (id: string) => {
    setActiveConversation(id);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
          : conv
      )
    );
  };

  return (
    <Layout>
      <div className="container px-0 md:px-4 mx-auto max-w-7xl">
        <div className="h-[calc(100vh-96px)] flex overflow-hidden rounded-lg border">
          {/* Conversations sidebar */}
          <div className="w-full max-w-xs border-r bg-card hidden md:flex flex-col">
            <div className="p-3 border-b">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-9 h-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <h2 className="font-semibold text-lg">Messages</h2>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeConversation === conv.id 
                          ? 'bg-accent' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => selectConversation(conv.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                          <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conv.user.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-medium truncate">{conv.user.name}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {conv.lastMessage.timestamp}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${!conv.lastMessage.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                          {conv.lastMessage.text}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="min-w-[20px] h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {conv.unreadCount}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          
          {/* Message content */}
          {activeConversation && currentConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Conversation header */}
              <div className="p-3 border-b flex items-center justify-between bg-card">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentConversation.user.avatar} alt={currentConversation.user.name} />
                    <AvatarFallback>{currentConversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversation.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.user.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Phone size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Video size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Info size={18} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Delete conversation</DropdownMenuItem>
                      <DropdownMenuItem>Block user</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'currentUser' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-secondary text-secondary-foreground rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'currentUser' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-3 border-t bg-card">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-card">
              <div className="text-center max-w-md p-6">
                <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
                <p className="text-muted-foreground mb-6">
                  Select a conversation from the list or start a new one to begin chatting.
                </p>
                <Button>Start a new conversation</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
