import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import FeaturedBooks from '@/components/FeaturedBooks';
import AuthModal from '@/components/AuthModal';
import { Book } from '@/types';
import BookCard from '@/components/BookCard';

// Sample data for featured books
const featuredBooks: Book[] = [
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

// Sample data for new arrivals
const newArrivals: Book[] = [
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

// Sample data for popular books
const popularBooks: Book[] = [
  {
    id: '9',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive guide to calculus covering limits, derivatives, integrals, and more.',
    genre: ['Mathematics', 'Education'],
    publishedYear: 2019,
    available: true,
    totalCopies: 25,
    availableCopies: 10
  },
  {
    id: '10',
    title: 'Digital Marketing Strategies',
    author: 'Lisa Wong',
    coverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=500',
    description: 'Learn modern digital marketing techniques and strategies for business growth.',
    genre: ['Marketing', 'Business'],
    publishedYear: 2022,
    available: true,
    totalCopies: 15,
    availableCopies: 8
  },
  {
    id: '11',
    title: 'Human Anatomy and Physiology',
    author: 'Elizabeth Harris',
    coverImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=500',
    description: 'A detailed exploration of human anatomy and physiological systems.',
    genre: ['Biology', 'Medicine'],
    publishedYear: 2020,
    available: true,
    totalCopies: 18,
    availableCopies: 5
  },
  {
    id: '12',
    title: 'Introduction to Psychology',
    author: 'Mark Thompson',
    coverImage: 'https://images.unsplash.com/photo-1576094502599-6763da102ea7?auto=format&fit=crop&q=80&w=500',
    description: 'A comprehensive introduction to the principles of psychology and human behavior.',
    genre: ['Psychology', 'Social Science'],
    publishedYear: 2021,
    available: true,
    totalCopies: 20,
    availableCopies: 12
  }
];

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <Hero />
      
      <FeaturedBooks title="Featured Books" books={featuredBooks} />
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">How Our Book Bank Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access thousands of textbooks through our automated system.
              Borrowing and returning has never been easier.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-muted hover:border-bookbank-primary/50 hover:shadow-md transition-all">
              <div className="bg-bookbank-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-bookbank-primary">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Register</h3>
              <p className="text-muted-foreground">
                Create an account with your student credentials to access our collection.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-muted hover:border-bookbank-primary/50 hover:shadow-md transition-all">
              <div className="bg-bookbank-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-bookbank-primary">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Browse & Reserve</h3>
              <p className="text-muted-foreground">
                Search our collection and reserve the books you need for your courses.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-muted hover:border-bookbank-primary/50 hover:shadow-md transition-all">
              <div className="bg-bookbank-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-bookbank-primary">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Borrow & Return</h3>
              <p className="text-muted-foreground">
                Pick up your books and return them when you're done. Automatic reminders included!
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <Link to="/books">
              <Button className="bg-bookbank-primary hover:bg-bookbank-primary/90">
                Start Browsing
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FeaturedBooks title="New Arrivals" books={newArrivals} />
      
      <section className="section-padding bg-bookbank-accent/5">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-3xl font-serif font-bold mb-4">Join Our Book Bank Today</h2>
                <p className="text-muted-foreground mb-6">
                  Get access to thousands of textbooks and resources at a fraction of the cost. Join hundreds of students already saving money with our book bank system.
                </p>
                <Button 
                  className="bg-bookbank-primary hover:bg-bookbank-primary/90"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Register Now
                </Button>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <img 
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=500" 
                  alt="Students studying with books" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedBooks title="Popular Books" books={popularBooks} />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
