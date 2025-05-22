import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Search, Filter, UserCog } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Book } from '@/types';
import AuthModal from '@/components/AuthModal';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUserRole, UserProfile } from '@/services/userService';
import { mapDatabaseBookToBook, mapBookToDatabaseBook } from '@/utils/dataMappers';

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
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [isDeleteBookOpen, setIsDeleteBookOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState<'student' | 'librarian'>('student');
  const queryClient = useQueryClient();
  
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
  
  // Query for fetching books
  const { data: booksData, isLoading: isLoadingBooks } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title');
      
      if (error) {
        throw error;
      }
      
      // Map database books to frontend Book type
      return data.map(mapDatabaseBookToBook);
    }
  });

  // Query for fetching users
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  // Set books when data is loaded
  useEffect(() => {
    if (booksData) {
      setBooks(booksData);
    }
  }, [booksData]);

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

  // Open edit role dialog
  const openEditRoleDialog = (user: UserProfile) => {
    setCurrentUser(user);
    setSelectedRole(user.role);
    setIsEditRoleOpen(true);
  };

  // Add new book
  const addBook = async () => {
    try {
      const dbBook = mapBookToDatabaseBook(formData);
      
      const { data, error } = await supabase
        .from('books')
        .insert(dbBook)
        .select();
      
      if (error) {
        throw error;
      }
      
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsAddBookOpen(false);
      
      toast({
        title: "Book Added",
        description: `"${formData.title}" has been added to the library.`,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update book
  const updateBook = async () => {
    if (!currentBook) return;
    
    try {
      const dbBook = mapBookToDatabaseBook(formData);
      
      const { error } = await supabase
        .from('books')
        .update(dbBook)
        .eq('id', currentBook.id);
      
      if (error) {
        throw error;
      }
      
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsEditBookOpen(false);
      
      toast({
        title: "Book Updated",
        description: `"${formData.title}" has been updated.`,
      });
    } catch (error) {
      console.error("Error updating book:", error);
      toast({
        title: "Error",
        description: "Failed to update book. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete book
  const deleteBook = async () => {
    if (!currentBook) return;
    
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', currentBook.id);
      
      if (error) {
        throw error;
      }
      
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsDeleteBookOpen(false);
      
      toast({
        title: "Book Deleted",
        description: `"${currentBook.title}" has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update user role
  const handleUpdateUserRole = async () => {
    if (!currentUser) return;
    
    const success = await updateUserRole(currentUser.id, selectedRole);
    
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditRoleOpen(false);
    }
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter users based on search term
  const filteredUsers = usersData?.filter(user => 
    (user.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ?? false) ||
    (user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ?? false) ||
    user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
  ) ?? [];

  // Check if the current user is authenticated and authorized
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthModalOpen(true);
        return;
      }

      // Check if the user is a librarian
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (data?.role === 'librarian') {
        setIsAuthorized(true);
      } else {
        toast({
          title: "Access Denied",
          description: "You need librarian privileges to access the admin panel.",
          variant: "destructive",
        });
      }
    };

    checkAuth();
  }, [toast]);

  if (!isAuthorized && !isAuthModalOpen) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Access Restricted</h1>
          <p className="mb-6">You need librarian privileges to access the admin panel.</p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

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
                {isLoadingBooks ? (
                  <div className="flex justify-center py-8">
                    <p>Loading books...</p>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>Manage user accounts and permissions.</CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex justify-center py-8">
                    <p>Loading users...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                            <TableCell>{user.email || 'N/A'}</TableCell>
                            <TableCell>
                              <span className={user.role === 'librarian' ? "text-blue-600" : ""}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => openEditRoleDialog(user)}
                              >
                                <UserCog className="h-4 w-4" />
                                <span className="hidden sm:inline">Change Role</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No users found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
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

      {/* Edit User Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for {currentUser?.name || currentUser?.email || 'this user'}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Select
                value={selectedRole}
                onValueChange={(value: 'student' | 'librarian') => setSelectedRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="librarian">Librarian</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Librarians have access to the admin panel and can manage books and users.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateUserRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default AdminPage;
