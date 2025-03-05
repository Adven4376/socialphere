
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - similar to Index but with different content
const explorePosts = [
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Michael Brown',
      username: 'mikebrown',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: 'Just launched my tech startup after months of hard work. Super excited for this journey! #startup #tech #entrepreneurship',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 89,
    comments: 12,
    createdAt: '1d ago',
  },
  {
    id: '6',
    user: {
      id: 'user6',
      name: 'Julia Chen',
      username: 'juliac',
      avatar: 'https://i.pravatar.cc/150?img=29',
    },
    content: 'Finished reading this amazing book on artificial intelligence. Highly recommend for anyone interested in the future of tech. #AI #books #learning',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 67,
    comments: 9,
    createdAt: '1d ago',
  },
  {
    id: '7',
    user: {
      id: 'user7',
      name: 'Robert Taylor',
      username: 'robtaylor',
      avatar: 'https://i.pravatar.cc/150?img=18',
    },
    content: 'Just completed my first marathon! 26.2 miles of pure determination. Thanks to everyone who supported me along the way. #fitness #marathon #achievement',
    image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 142,
    comments: 28,
    createdAt: '2d ago',
  },
];

const popularTags = [
  "Technology", "Travel", "Food", "Fitness", "Art", 
  "Music", "Photography", "Fashion", "Books", "Nature"
];

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof explorePosts>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const tagFilter = searchParams.get('tag') || '';
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPosts(explorePosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchParams({ tag });
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl font-bold mb-6">Explore</h1>
          
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search posts, people, or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="mb-8">
            <h2 className="text-base font-medium mb-3">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    tagFilter === tag 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
            </TabsList>
            <TabsContent value="trending">
              {isLoading ? (
                // Loading skeleton
                <div className="space-y-6 animate-pulse">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-full bg-card rounded-xl overflow-hidden shadow-sm border p-4">
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="latest">
              <div className="space-y-6">
                {isLoading ? (
                  <div className="w-full py-16 text-center">
                    <div className="inline-block animate-pulse">
                      Loading latest posts...
                    </div>
                  </div>
                ) : (
                  [...posts].reverse().map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
