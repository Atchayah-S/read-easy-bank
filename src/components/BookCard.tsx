
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const availabilityColor = book.available 
    ? "bg-green-100 text-green-800 hover:bg-green-200" 
    : "bg-red-100 text-red-800 hover:bg-red-200";

  return (
    <Card className="overflow-hidden card-hover">
      <Link to={`/books/${book.id}`}>
        <div className="h-[200px] overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif font-semibold text-lg line-clamp-2 mb-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {book.genre.slice(0, 2).map((g, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
            {book.genre.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{book.genre.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Badge className={availabilityColor}>
            {book.available ? `Available (${book.availableCopies})` : 'Unavailable'}
          </Badge>
          <span className="text-xs text-muted-foreground">{book.publishedYear}</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BookCard;
