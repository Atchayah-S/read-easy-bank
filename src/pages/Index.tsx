
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import FeaturedBooks from '@/components/FeaturedBooks';
import AuthModal from '@/components/AuthModal';
import { Separator } from '@/components/ui/separator';
import { Book } from '@/types';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[] | null>(null);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would call an API to search for books
    // For now, we'll just simulate a search result
    if (query) {
      // Simulate search results
      setSearchResults([
        {
          id: '5',
          title: `Search result for "${query}"`,
          author: 'Various Authors',
          coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=500',
          description: 'This is a sample search result.',
          genre: ['Education'],
          publishedYear: 2023,
          available: true,
          totalCopies: 5,
          availableCopies: 2
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
                <div key={book.id} className="bg-white p-4 rounded shadow">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <FeaturedBooks title="Recently Added Books" />
          
          <Separator className="my-4" />
          
          <FeaturedBooks title="Most Popular Books" />
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
