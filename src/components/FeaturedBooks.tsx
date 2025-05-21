
import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/types';

interface FeaturedBooksProps {
  title: string;
  books: Book[];
}

// Sample data for books
const sampleBooks: Book[] = [
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

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ title, books = sampleBooks }) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
