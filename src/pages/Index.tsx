
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CreatePostCard from '@/components/CreatePostCard';
import PostCard from '@/components/PostCard';
import SuggestedUsers from '@/components/SuggestedUsers';
import TrendingTopics from '@/components/TrendingTopics'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockPosts = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'Just finished building my new portfolio website with React and Tailwind CSS. Check it out and let me know what you think!',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 42,
    comments: 8,
    createdAt: '2h ago',
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Emma Smith',
      username: 'emmasmith',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'Beautiful morning hike in the mountains. Nature is truly the best therapy. #nature #outdoors #hiking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 126,
    comments: 14,
    createdAt: '4h ago',
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    content: 'Working on some exciting new features for our app. Can\'t wait to share them with you all soon!',
    image: null,
    likes: 56,
    comments: 11,
    createdAt: '6h ago',
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'Sophie Williams',
      username: 'sophiew',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    content: 'Just got back from an amazing trip to Japan. The culture, food, and people are incredible. Already planning my next visit! #travel #japan',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 203,
    comments: 31,
    createdAt: '8h ago',
  },
];

const HomeContentHeader = () => {
  return (
    <div className="container px-4 mx-auto max-w-7xl mb-6">
      <Tabs defaultValue="foryou" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="foryou" className="text-base">For You</TabsTrigger>
          <TabsTrigger value="following" className="text-base">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="foryou">
          {/* For You content is rendered in the main component */}
        </TabsContent>
        <TabsContent value="following">
          <div className="w-full flex items-center justify-center py-12 text-center">
            <div className="max-w-md">
              <h3 className="text-xl font-medium mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Content from users you follow will appear here. Start following users to see their posts!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof mockPosts>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <HomeContentHeader />
      
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePostCard />
            
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-full max-w-2xl mx-auto bg-card rounded-xl overflow-hidden shadow-sm border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted rounded"></div>
                        <div className="h-3 w-32 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </div>
                    <div className="h-48 w-full bg-muted rounded-lg mb-4"></div>
                    <div className="flex justify-between pt-2 border-t">
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <SuggestedUsers />
            <TrendingTopics />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
