
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Calendar, MapPin, Link as LinkIcon, Mail, 
  Users, Settings, MoreHorizontal 
} from 'lucide-react';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data
const userData = {
  id: 'user1',
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://i.pravatar.cc/150?img=3',
  coverPhoto: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1903&q=80',
  bio: 'Frontend Developer | UI/UX Enthusiast | Coffee Lover',
  location: 'San Francisco, CA',
  website: 'johndoe.com',
  joinDate: 'January 2021',
  following: 243,
  followers: 1548,
  isCurrentUser: true,
};

// Mock posts - reusing some from before
const userPosts = [
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
    id: '3',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'Working on some exciting new features for our app. Can\'t wait to share them with you all soon!',
    image: null,
    likes: 56,
    comments: 11,
    createdAt: '6h ago',
  },
  {
    id: '8',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'Happy Friday everyone! What are your weekend plans? I\'m planning to catch up on some reading and maybe do a little hiking if the weather cooperates.',
    image: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 31,
    comments: 7,
    createdAt: '3d ago',
  },
];

const Profile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<typeof userData | null>(null);
  const [posts, setPosts] = useState<typeof userPosts>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUser(userData);
      setPosts(userPosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-48 w-full bg-muted rounded-xl mb-6"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-24 w-24 rounded-full bg-muted border-4 border-background"></div>
              <div className="space-y-2">
                <div className="h-6 w-36 bg-muted rounded"></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
            </div>
            <div className="flex gap-4 mb-8">
              <div className="h-10 w-20 bg-muted rounded"></div>
              <div className="h-10 w-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container px-4 mx-auto max-w-4xl text-center py-12">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground mb-6">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Layout>
      <div className="bg-background pb-6">
        {/* Cover photo */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden bg-accent">
          <img
            src={user.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container px-4 mx-auto max-w-4xl">
          {/* Profile header */}
          <div className="relative flex flex-col md:flex-row md:items-end -mt-16 mb-6">
            <Avatar className="h-32 w-32 border-4 border-background rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-4 flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            
            <div className="mt-4 md:mt-0 md:mb-4 flex gap-2">
              {user.isCurrentUser ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/settings">
                      <Settings size={16} className="mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant={isFollowing ? "outline" : "default"} 
                    size="sm"
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail size={16} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Block</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {/* Bio and info */}
          <div className="mb-6">
            <p className="mb-4">{user.bio}</p>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon size={16} />
                  <a 
                    href={`https://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <Link to={`/profile/${user.id}/following`} className="flex items-center gap-1 hover:underline">
              <span className="font-semibold">{user.following}</span>
              <span className="text-muted-foreground">Following</span>
            </Link>
            <Link to={`/profile/${user.id}/followers`} className="flex items-center gap-1 hover:underline">
              <span className="font-semibold">{user.followers}</span>
              <span className="text-muted-foreground">Followers</span>
            </Link>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="space-y-6 py-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="media">
              <div className="py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {posts
                    .filter((post) => post.image)
                    .map((post) => (
                      <div key={post.id} className="aspect-square rounded-xl overflow-hidden bg-accent relative group">
                        <img
                          src={post.image!}
                          alt="Media"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Link to={`/post/${post.id}`} className="text-white">
                            View Post
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="likes">
              <div className="py-4 text-center text-muted-foreground">
                Posts liked by {user.name} will appear here.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
