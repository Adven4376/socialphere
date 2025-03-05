
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Home, Search, MessagesSquare, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: MessagesSquare, label: 'Messages', path: '/messages' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            S
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            SocialSphere
          </h1>
        </Link>

        {isMobile ? (
          <MobileNav currentPath={location.pathname} />
        ) : (
          <DesktopNav currentPath={location.pathname} />
        )}
      </div>
    </header>
  );
};

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="flex items-center gap-2">
      <nav className="hidden md:flex items-center gap-1 mr-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "px-3 gap-2 transition-all", 
                  isActive 
                    ? "font-medium text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

const MobileNav = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">@johndoe</p>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                          isActive 
                            ? "bg-secondary text-primary font-medium" 
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="p-4 border-t mt-auto">
              <Button variant="outline" className="w-full">
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
