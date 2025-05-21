
import React from 'react';
import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Book as BookType } from '@/types';
import { Book, Calendar, Clock, User } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // In a real app, this would be fetched from an API
  const book: BookType = {
    id: id || '1',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive introduction to the field of computer science, covering fundamental concepts and principles. This textbook is designed for undergraduate students beginning their journey in computer science. It covers algorithm design, data structures, programming paradigms, computer architecture, and more.',
    genre: ['Computer Science', 'Education', 'Programming'],
    publishedYear: 2022,
    available: true,
    totalCopies: 10,
    availableCopies: 5
  };

  const handleBorrow = () => {
    toast({
      title: "Book Borrowed",
      description: "You have successfully borrowed this book.",
    });
  };

  const handleReserve = () => {
    toast({
      title: "Book Reserved",
      description: "You have successfully reserved this book.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOpenAuthModal={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gray-100 flex items-center justify-center p-6">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="h-64 object-cover rounded-md shadow-lg"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-serif font-bold mb-2">{book.title}</h1>
                  <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
                </div>
                <Badge className={book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {book.available ? `Available (${book.availableCopies})` : 'Unavailable'}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.genre.map((g, i) => (
                  <Badge key={i} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-2 text-bookbank-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-medium">{book.publishedYear}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-bookbank-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Period</p>
                    <p className="font-medium">14 days</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-bookbank-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Copies</p>
                    <p className="font-medium">{book.totalCopies}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-8">{book.description}</p>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 sm:flex-none bg-bookbank-primary hover:bg-bookbank-primary/90"
                    onClick={handleBorrow}
                    disabled={!book.available}
                  >
                    Borrow Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 sm:flex-none"
                    onClick={handleReserve}
                    disabled={book.available}
                  >
                    Reserve
                  </Button>
                </div>
                
                <Button variant="ghost" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Check Availability Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related books section would go here in a real app */}
      </div>
    </div>
  );
};

export default BookDetail;
