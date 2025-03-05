import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  {
    id: '1',
    tag: 'Technology',
    topic: 'AI Breakthroughs',
    posts: 2543,
  },
  {
    id: '2',
    tag: 'Sports',
    topic: 'Summer Olympics',
    posts: 1876,
  },
  {
    id: '3',
    tag: 'Entertainment',
    topic: 'Award Season',
    posts: 1234,
  },
  {
    id: '4',
    tag: 'Science',
    topic: 'Space Exploration',
    posts: 945,
  },
];

const TrendingTopics = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-1">
        {trendingTopics.map((topic) => (
          <Link 
            key={topic.id} 
            to={`/explore?tag=${topic.tag}`} 
            className="block group"
          >
            <div className="mb-1">
              <span className="text-xs text-muted-foreground">
                {topic.tag}
              </span>
            </div>
            <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
              #{topic.topic}
            </h3>
            <p className="text-xs text-muted-foreground">
              {topic.posts.toLocaleString()} posts
            </p>
          </Link>
        ))}
        <Button variant="ghost" className="w-full text-sm text-muted-foreground mt-2">
          Show more
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
