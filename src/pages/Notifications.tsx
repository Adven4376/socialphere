
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock notifications data
const notificationsData = [
  {
    id: 'notif1',
    type: 'like',
    isRead: false,
    timestamp: '10 minutes ago',
    user: {
      id: 'user2',
      name: 'Emma Smith',
      username: 'emmasmith',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: {
      postId: '1',
      text: 'Just finished building my new portfolio website with React and Tailwind CSS. Check it out and let me know what you think!',
    },
  },
  {
    id: 'notif2',
    type: 'follow',
    isRead: false,
    timestamp: '2 hours ago',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
  },
  {
    id: 'notif3',
    type: 'comment',
    isRead: true,
    timestamp: 'Yesterday',
    user: {
      id: 'user4',
      name: 'Sophie Williams',
      username: 'sophiew',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    content: {
      postId: '3',
      text: 'Working on some exciting new features for our app. Can\'t wait to share them with you all soon!',
      comment: 'Can\'t wait to see what you\'re working on! The last update was amazing.',
    },
  },
  {
    id: 'notif4',
    type: 'like',
    isRead: true,
    timestamp: '2 days ago',
    user: {
      id: 'user5',
      name: 'Michael Brown',
      username: 'mikebrown',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: {
      postId: '8',
      text: 'Happy Friday everyone! What are your weekend plans?',
    },
  },
  {
    id: 'notif5',
    type: 'mention',
    isRead: true,
    timestamp: '3 days ago',
    user: {
      id: 'user6',
      name: 'Julia Chen',
      username: 'juliac',
      avatar: 'https://i.pravatar.cc/150?img=29',
    },
    content: {
      postId: '10',
      text: 'Hey @johndoe, have you seen the new design system documentation? It looks really good!',
    },
  },
];

const NotificationItem = ({ notification, onMarkAsRead }: { 
  notification: typeof notificationsData[0],
  onMarkAsRead: (id: string) => void 
}) => {
  const { type, user, content, timestamp, isRead, id } = notification;
  
  let icon;
  let bgColor;
  let notificationText;
  
  switch (type) {
    case 'like':
      icon = <Heart size={16} className="text-red-500" />;
      bgColor = 'bg-red-50';
      notificationText = <span>liked your post</span>;
      break;
    case 'comment':
      icon = <MessageCircle size={16} className="text-blue-500" />;
      bgColor = 'bg-blue-50';
      notificationText = <span>commented on your post</span>;
      break;
    case 'follow':
      icon = <UserPlus size={16} className="text-green-500" />;
      bgColor = 'bg-green-50';
      notificationText = <span>followed you</span>;
      break;
    case 'mention':
      icon = <AlertCircle size={16} className="text-purple-500" />;
      bgColor = 'bg-purple-50';
      notificationText = <span>mentioned you in a post</span>;
      break;
    default:
      icon = <AlertCircle size={16} />;
      bgColor = 'bg-gray-50';
      notificationText = <span>interacted with you</span>;
  }
  
  return (
    <div 
      className={cn(
        "p-4 border-b transition-colors", 
        isRead ? "bg-card" : "bg-accent"
      )}
      onClick={() => !isRead && onMarkAsRead(id)}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="mb-1">
                <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                  {user.name}
                </Link>{' '}
                {notificationText}
              </div>
              
              {content && (
                <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                  {content.comment || content.text}
                </p>
              )}
              
              <div className="text-xs text-muted-foreground">
                {timestamp}
                {!isRead && (
                  <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary"></span>
                )}
              </div>
            </div>
            
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", bgColor)}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };
  
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.isRead;
    if (activeTab === 'mentions') return notif.type === 'mention';
    return true;
  });
  
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <Layout>
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 bg-card rounded-lg border overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-6 animate-pulse">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-4">
                  <AlertCircle size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all' ? "You don't have any notifications yet." : 
                   activeTab === 'unread' ? "You don't have any unread notifications." :
                   "You haven't been mentioned in any posts."}
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
