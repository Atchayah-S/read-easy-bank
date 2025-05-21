
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import FeaturedBooks from '@/components/FeaturedBooks';
import AuthModal from '@/components/AuthModal';
import { Separator } from '@/components/ui/separator';
import { Book } from '@/types';

// Sample data for books
const recentlyAddedBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive introduction to the field of computer science, covering fundamental concepts and principles.',
    genre: ['Computer Science', 'Education'],
    publishedYear: 2022,
    available: true,
    totalCopies: 10,
    availableCopies: 5
  },
  {
    id: '2',
    title: 'Engineering Mathematics',
    author: 'Sarah Johnson',
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=500',
    description: 'This book covers essential mathematical concepts for engineering students.',
    genre: ['Mathematics', 'Engineering'],
    publishedYear: 2020,
    available: false,
    totalCopies: 8,
    availableCopies: 0
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    author: 'Michael Lee',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=500',
    description: 'Learn about various data structures and algorithms essential for computer programming.',
    genre: ['Computer Science', 'Programming'],
    publishedYear: 2021,
    available: true,
    totalCopies: 12,
    availableCopies: 3
  },
  {
    id: '4',
    title: 'Principles of Economics',
    author: 'Emily Chen',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500',
    description: 'An introductory text on economic principles and theories.',
    genre: ['Economics', 'Business'],
    publishedYear: 2019,
    available: true,
    totalCopies: 15,
    availableCopies: 7
  }
];

const popularBooks: Book[] = [
  {
    id: '5',
    title: 'Advanced Programming in Python',
    author: 'David Wilson',
    coverImage: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive guide to advanced programming techniques in Python.',
    genre: ['Programming', 'Computer Science'],
    publishedYear: 2021,
    available: true,
    totalCopies: 10,
    availableCopies: 2
  },
  {
    id: '6',
    title: 'Fundamentals of Physics',
    author: 'Robert Brown',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=500',
    description: 'An essential textbook covering the fundamentals of physics for undergraduate students.',
    genre: ['Physics', 'Science'],
    publishedYear: 2018,
    available: true,
    totalCopies: 20,
    availableCopies: 15
  },
  {
    id: '7',
    title: 'Introduction to Artificial Intelligence',
    author: 'Jennifer Adams',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=500',
    description: 'Learn the fundamentals of artificial intelligence and machine learning.',
    genre: ['Computer Science', 'AI'],
    publishedYear: 2023,
    available: true,
    totalCopies: 8,
    availableCopies: 4
  },
  {
    id: '8',
    title: 'Organic Chemistry',
    author: 'Thomas Lee',
    coverImage: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive guide to understanding organic chemistry principles and reactions.',
    genre: ['Chemistry', 'Science'],
    publishedYear: 2020,
    available: false,
    totalCopies: 12,
    availableCopies: 0
  }
];

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[] | null>(null);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would call an API to search for books
    // For now, we'll just simulate a search result
    if (query) {
      // Simulate search results by finding books that match the query
      const allBooks = [...recentlyAddedBooks, ...popularBooks];
      const results = allBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results.length > 0 ? results : [
        {
          id: 'search-1',
          title: `No exact matches for "${query}"`,
          author: 'Try different keywords',
          coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=500',
          description: 'We could not find any books matching your search criteria.',
          genre: ['Search'],
          publishedYear: new Date().getFullYear(),
          available: false,
          totalCopies: 0,
          availableCopies: 0
        }
      ]);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <Hero />
      
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {searchResults ? (
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <FeaturedBooks title="Recently Added Books" books={recentlyAddedBooks} />
          
          <Separator className="my-4" />
          
          <FeaturedBooks title="Most Popular Books" books={popularBooks} />
        </>
      )}
      
      <footer className="bg-gray-100 py-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">ReadEasyBank</h3>
              <p className="text-muted-foreground">
                Your university's digital book repository for easy access to all your educational resources.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="#" className="nav-link">Browse Books</a></li>
                <li><a href="#" className="nav-link">My Account</a></li>
                <li><a href="#" className="nav-link">Help & FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="nav-link">Book Request Form</a></li>
                <li><a href="#" className="nav-link">Reading Recommendations</a></li>
                <li><a href="#" className="nav-link">Study Materials</a></li>
                <li><a href="#" className="nav-link">Research Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <address className="not-italic text-muted-foreground">
                University Library Building<br />
                123 Campus Drive<br />
                University City, State 12345<br />
                <a href="mailto:bookbank@university.edu" className="text-bookbank-primary">
                  bookbank@university.edu
                </a>
              </address>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ReadEasyBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
