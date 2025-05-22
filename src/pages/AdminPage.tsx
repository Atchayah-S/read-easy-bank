
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Book } from '@/types';
import AuthModal from '@/components/AuthModal';

// Sample book data (this would come from a database in a real app)
const initialBooks: Book[] = [
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
];

// Available genres for the select input
const availableGenres = [
  'Computer Science',
  'Mathematics',
  'Engineering',
  'Programming',
  'Education',
  'Business',
  'Economics',
  'Physics',
  'Science',
  'Chemistry'
];

const AdminPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [isDeleteBookOpen, setIsDeleteBookOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Form state for adding/editing books
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    description: '',
    genre: [''],
    publishedYear: new Date().getFullYear(),
    totalCopies: 1,
    availableCopies: 1,
  });

  const { toast } = useToast();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10) || 0
    });
  };

  // Handle genre selection (simplified for demo)
  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value.split(',').map(g => g.trim());
    setFormData({
      ...formData,
      genre
    });
  };

  // Open add book dialog
  const openAddBookDialog = () => {
    setFormData({
      title: '',
      author: '',
      coverImage: '',
      description: '',
      genre: [''],
      publishedYear: new Date().getFullYear(),
      totalCopies: 1,
      availableCopies: 1,
    });
    setIsAddBookOpen(true);
  };

  // Open edit book dialog
  const openEditBookDialog = (book: Book) => {
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      coverImage: book.coverImage,
      description: book.description,
      genre: book.genre,
      publishedYear: book.publishedYear,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
    });
    setIsEditBookOpen(true);
  };

  // Open delete book confirmation
  const openDeleteBookDialog = (book: Book) => {
    setCurrentBook(book);
    setIsDeleteBookOpen(true);
  };

  // Add new book
  const addBook = () => {
    const newBook: Book = {
      id: (books.length + 1).toString(),
      ...formData,
      available: formData.availableCopies > 0
    };
    
    setBooks([...books, newBook]);
    setIsAddBookOpen(false);
    
    toast({
      title: "Book Added",
      description: `"${newBook.title}" has been added to the library.`,
    });
  };

  // Update book
  const updateBook = () => {
    if (!currentBook) return;
    
    const updatedBooks = books.map(book => {
      if (book.id === currentBook.id) {
        return {
          ...book,
          ...formData,
          available: formData.availableCopies > 0
        };
      }
      return book;
    });
    
    setBooks(updatedBooks);
    setIsEditBookOpen(false);
    
    toast({
      title: "Book Updated",
      description: `"${formData.title}" has been updated.`,
    });
  };

  // Delete book
  const deleteBook = () => {
    if (!currentBook) return;
    
    const filteredBooks = books.filter(book => book.id !== currentBook.id);
    setBooks(filteredBooks);
    setIsDeleteBookOpen(false);
    
    toast({
      title: "Book Deleted",
      description: `"${currentBook.title}" has been deleted.`,
    });
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <Button 
            className="bg-bookbank-primary hover:bg-bookbank-primary/90 flex items-center gap-2"
            onClick={openAddBookDialog}
          >
            <Plus className="h-4 w-4" /> Add New Book
          </Button>
        </div>

        <Tabs defaultValue="books">
          <TabsList className="mb-6">
            <TabsTrigger value="books">Books Management</TabsTrigger>
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Inventory</CardTitle>
                <CardDescription>Manage the books in your library. Add, edit, or remove books as needed.</CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search books..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.publishedYear}</TableCell>
                          <TableCell>{book.totalCopies}</TableCell>
                          <TableCell>
                            <span className={book.availableCopies > 0 ? "text-green-600" : "text-red-600"}>
                              {book.availableCopies}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => openEditBookDialog(book)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700" 
                                onClick={() => openDeleteBookDialog(book)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No books found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>User management functionality will be implemented in the future.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed rounded-md">
                  <p className="text-muted-foreground">User management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Library statistics and reports will be implemented in the future.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed rounded-md">
                  <p className="text-muted-foreground">Reporting features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Enter the details of the new book to add it to the library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">Title</label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="author" className="text-right font-medium">Author</label>
              <Input
                id="author"
                name="author"
                className="col-span-3"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="coverImage" className="text-right font-medium">Cover URL</label>
              <Input
                id="coverImage"
                name="coverImage"
                className="col-span-3"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="publishedYear" className="text-right font-medium">Year</label>
              <Input
                id="publishedYear"
                name="publishedYear"
                type="number"
                className="col-span-3"
                value={formData.publishedYear}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="genre" className="text-right font-medium">Genres</label>
              <Input
                id="genre"
                name="genre"
                className="col-span-3"
                value={formData.genre.join(', ')}
                onChange={handleGenreChange}
                placeholder="Computer Science, Education"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="totalCopies" className="text-right font-medium">Total Copies</label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                className="col-span-3"
                value={formData.totalCopies}
                onChange={handleNumberChange}
                min={1}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="availableCopies" className="text-right font-medium">Available</label>
              <Input
                id="availableCopies"
                name="availableCopies"
                type="number"
                className="col-span-3"
                value={formData.availableCopies}
                onChange={handleNumberChange}
                min={0}
                max={formData.totalCopies}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>Cancel</Button>
            <Button onClick={addBook}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the details of this book.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-title" className="text-right font-medium">Title</label>
              <Input
                id="edit-title"
                name="title"
                className="col-span-3"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-author" className="text-right font-medium">Author</label>
              <Input
                id="edit-author"
                name="author"
                className="col-span-3"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-coverImage" className="text-right font-medium">Cover URL</label>
              <Input
                id="edit-coverImage"
                name="coverImage"
                className="col-span-3"
                value={formData.coverImage}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-publishedYear" className="text-right font-medium">Year</label>
              <Input
                id="edit-publishedYear"
                name="publishedYear"
                type="number"
                className="col-span-3"
                value={formData.publishedYear}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-genre" className="text-right font-medium">Genres</label>
              <Input
                id="edit-genre"
                name="genre"
                className="col-span-3"
                value={formData.genre.join(', ')}
                onChange={handleGenreChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-description" className="text-right font-medium">Description</label>
              <Textarea
                id="edit-description"
                name="description"
                className="col-span-3"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-totalCopies" className="text-right font-medium">Total Copies</label>
              <Input
                id="edit-totalCopies"
                name="totalCopies"
                type="number"
                className="col-span-3"
                value={formData.totalCopies}
                onChange={handleNumberChange}
                min={1}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-availableCopies" className="text-right font-medium">Available</label>
              <Input
                id="edit-availableCopies"
                name="availableCopies"
                type="number"
                className="col-span-3"
                value={formData.availableCopies}
                onChange={handleNumberChange}
                min={0}
                max={formData.totalCopies}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookOpen(false)}>Cancel</Button>
            <Button onClick={updateBook}>Update Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Book Confirmation */}
      <Dialog open={isDeleteBookOpen} onOpenChange={setIsDeleteBookOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentBook?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteBookOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteBook}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default AdminPage;
