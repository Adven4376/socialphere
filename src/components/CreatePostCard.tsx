import { useState, useRef } from 'react';
import { Image, Smile, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CreatePostCard = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = () => {
    if (!content.trim() && !image) {
      toast.error('Please enter some content or add an image');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Post created successfully!');
      setContent('');
      setImage(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-xl overflow-hidden shadow-sm border mb-6 p-4">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            className="border-none resize-none p-0 focus-visible:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {image && (
            <div className="relative mt-3 rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt="Post preview" 
                className="w-full max-h-60 object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background/90"
                onClick={removeImage}
              >
                <X size={16} />
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <Smile size={18} />
              </Button>
            </div>
            
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && !image)}
              className="px-4"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
