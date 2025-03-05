
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const suggestedUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'David Chen',
    username: 'dchen',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '3',
    name: 'Mia Williams',
    username: 'miaw',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const SuggestedUsers = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Suggested for you</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-1">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <Link to={`/profile/${user.id}`} className="flex items-center gap-3 group">
              <Avatar className="h-8 w-8 transition-transform group-hover:scale-105">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  {user.name}
                </h3>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </Link>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Follow
            </Button>
          </div>
        ))}
        <Button variant="ghost" className="w-full text-sm text-muted-foreground mt-2">
          Show more
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
