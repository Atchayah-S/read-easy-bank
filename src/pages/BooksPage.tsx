
import React, { useState } from 'react';
import { Book } from '@/types';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Filter, BookOpen, SortAsc, SortDesc } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

// Sample data for books - this would come from an API in a real app
const allBooks: Book[] = [
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
  },
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
  },
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

// Extract all unique genres from books
const allGenres = Array.from(new Set(allBooks.flatMap(book => book.genre)));

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>(allBooks);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  const handleSearch = (query: string) => {
    if (!query) {
      setBooks(allBooks);
      return;
    }
    
    const filteredBooks = allBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) || 
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    
    setBooks(filteredBooks);
  };

  const handleGenreFilter = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleAvailabilityFilter = (value: string) => {
    setAvailabilityFilter(value);
  };

  const handleSort = (value: string) => {
    setSortOrder(value);
  };

  const applyFilters = () => {
    let filtered = [...allBooks];
    
    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(book => 
        book.genre.some(g => selectedGenres.includes(g))
      );
    }
    
    // Apply availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(book => book.available);
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(book => !book.available);
    }
    
    // Apply sorting
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => b.publishedYear - a.publishedYear);
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => a.publishedYear - b.publishedYear);
    } else if (sortOrder === 'titleAZ') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'titleZA') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setBooks(filtered);
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setAvailabilityFilter('all');
    setSortOrder('newest');
    setBooks(allBooks);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <div className="bg-bookbank-primary/10 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-bookbank-dark mb-6">
            Browse Our Books
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Explore our extensive collection of textbooks and resources. Use the search bar or filters to find exactly what you're looking for.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs"
                >
                  Reset
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Genres</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {allGenres.map((genre) => (
                    <div key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`genre-${genre}`}
                        className="h-4 w-4 rounded border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleGenreFilter(genre)}
                      />
                      <label htmlFor={`genre-${genre}`} className="ml-2 text-sm text-gray-700">
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all"
                      name="availability"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={availabilityFilter === 'all'}
                      onChange={() => handleAvailabilityFilter('all')}
                    />
                    <label htmlFor="all" className="ml-2 text-sm text-gray-700">
                      All Books
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="available"
                      name="availability"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={availabilityFilter === 'available'}
                      onChange={() => handleAvailabilityFilter('available')}
                    />
                    <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                      Available Now
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unavailable"
                      name="availability"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={availabilityFilter === 'unavailable'}
                      onChange={() => handleAvailabilityFilter('unavailable')}
                    />
                    <label htmlFor="unavailable" className="ml-2 text-sm text-gray-700">
                      Currently Unavailable
                    </label>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sort By</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="newest"
                      name="sort"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={sortOrder === 'newest'}
                      onChange={() => handleSort('newest')}
                    />
                    <label htmlFor="newest" className="ml-2 text-sm text-gray-700 flex items-center">
                      <SortDesc className="h-3 w-3 mr-1" /> Newest First
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="oldest"
                      name="sort"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={sortOrder === 'oldest'}
                      onChange={() => handleSort('oldest')}
                    />
                    <label htmlFor="oldest" className="ml-2 text-sm text-gray-700 flex items-center">
                      <SortAsc className="h-3 w-3 mr-1" /> Oldest First
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="titleAZ"
                      name="sort"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={sortOrder === 'titleAZ'}
                      onChange={() => handleSort('titleAZ')}
                    />
                    <label htmlFor="titleAZ" className="ml-2 text-sm text-gray-700">
                      Title (A-Z)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="titleZA"
                      name="sort"
                      className="h-4 w-4 border-gray-300 text-bookbank-primary focus:ring-bookbank-primary"
                      checked={sortOrder === 'titleZA'}
                      onChange={() => handleSort('titleZA')}
                    />
                    <label htmlFor="titleZA" className="ml-2 text-sm text-gray-700">
                      Title (Z-A)
                    </label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-bookbank-primary hover:bg-bookbank-primary/90"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Book List */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-bookbank-primary" />
                    <h2 className="text-lg font-medium">
                      {books.length} {books.length === 1 ? 'Book' : 'Books'} Found
                    </h2>
                  </div>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {books.map((book) => (
                      <div key={book.id} className="flex border rounded-lg overflow-hidden hover:shadow-md transition-all">
                        <div className="w-1/4 h-40">
                          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-3/4 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <p className="text-sm line-clamp-2 mt-2">{book.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex space-x-2">
                              {book.genre.slice(0, 2).map((g, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  {g}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                book.available 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {book.available ? `Available (${book.availableCopies})` : 'Unavailable'}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">{book.publishedYear}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {books.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No books found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default BooksPage;
