
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Bookmark, BookmarkCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string;
      avatar?: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    createdAt: string;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-xl overflow-hidden shadow-sm border animate-fade-in transition-all hover:shadow-md mb-6">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to={`/profile/${post.user.id}`} className="flex items-center gap-3 group">
            <Avatar className="h-10 w-10 transition-transform group-hover:scale-105">
              <AvatarImage src={post.user.avatar || "https://github.com/shadcn.png"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                {post.user.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                @{post.user.username} · {post.createdAt}
              </p>
            </div>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Not interested</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Content */}
        <p className="text-base mb-4">{post.content}</p>
        
        {/* Image */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-accent">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "gap-2 text-sm font-normal", 
              liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground"
            )}
            onClick={handleLike}
          >
            <Heart size={18} className={liked ? "fill-red-500" : ""} />
            <span>{likes}</span>
          </Button>
          
          <Link to={`/post/${post.id}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-sm font-normal text-muted-foreground">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" className="gap-2 text-sm font-normal text-muted-foreground">
            <Share2 size={18} />
            <span>Share</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 text-sm font-normal",
              saved ? "text-primary" : "text-muted-foreground"
            )}
            onClick={handleSave}
          >
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
