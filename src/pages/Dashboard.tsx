
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, CheckCheck, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserProfile from '@/components/UserProfile';
import AuthModal from '@/components/AuthModal';

const Dashboard = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if coming from login/register redirect
    // In a real app, this would check for authentication tokens
    if (location.state?.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      // For demo purposes, we'll assume logged in
      // In a real app, we would check authentication status here
      setIsLoggedIn(true);
    }
  }, [location]);
  
  // This would typically come from a user context or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    id: "123",
    joinDate: "2023-01-15",
    booksRead: 12,
    currentlyBorrowed: 2
  };

  // These would be loaded from an API in a real application
  const borrowedBooks = [
    {
      id: "1",
      title: "Introduction to Computer Science",
      author: "John Smith",
      issueDate: "2023-05-01",
      dueDate: "2023-05-15",
      status: "borrowed"
    },
    {
      id: "2",
      title: "Engineering Mathematics",
      author: "Sarah Johnson",
      issueDate: "2023-05-05",
      dueDate: "2023-05-19",
      status: "overdue"
    }
  ];

  const reservedBooks = [
    {
      id: "3",
      title: "Data Structures and Algorithms",
      author: "Michael Lee",
      reservationDate: "2023-05-10",
      status: "pending"
    }
  ];

  const history = [
    {
      id: "4",
      title: "Principles of Economics",
      author: "Emily Chen",
      issueDate: "2023-04-01",
      returnDate: "2023-04-15",
      status: "returned"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Badge className="mr-2 bg-bookbank-primary">{user.role}</Badge>
            <Button variant="outline" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <UserProfile user={user} />
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Borrowed Books</CardTitle>
                <Book className="h-5 w-5 text-bookbank-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{borrowedBooks.length}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  You have {borrowedBooks.filter(book => book.status === "overdue").length} overdue books
                </CardDescription>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Reserved Books</CardTitle>
                <Calendar className="h-5 w-5 text-bookbank-secondary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{reservedBooks.length}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  You have {reservedBooks.filter(book => book.status === "pending").length} pending reservations
                </CardDescription>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">History</CardTitle>
                <Clock className="h-5 w-5 text-bookbank-accent" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{history.length}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  Total books you've read this semester
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="borrowed" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
            <TabsTrigger value="reserved">Reserved Books</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed">
            <div className="grid grid-cols-1 gap-4">
              {borrowedBooks.length > 0 ? (
                borrowedBooks.map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p>{new Date(book.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Due Date</p>
                          <p>{new Date(book.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className={
                            book.status === "borrowed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }>
                            {book.status === "borrowed" ? "Active" : "Overdue"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Extend</Button>
                      <Button className="bg-bookbank-primary hover:bg-bookbank-primary/90">Return</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <Book className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No borrowed books</h3>
                  <p className="text-muted-foreground">You don't have any books borrowed at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reserved">
            <div className="grid grid-cols-1 gap-4">
              {reservedBooks.length > 0 ? (
                reservedBooks.map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Reservation Date</p>
                          <p>{new Date(book.reservationDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Waiting
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        Cancel Reservation
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No reserved books</h3>
                  <p className="text-muted-foreground">You don't have any book reservations.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid grid-cols-1 gap-4">
              {history.length > 0 ? (
                history.map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p>{new Date(book.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Return Date</p>
                          <p>{new Date(book.returnDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className="bg-gray-100 text-gray-800">
                            <CheckCheck className="mr-1 h-3 w-3" /> Returned
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">
                        Borrow Again
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No borrowing history</h3>
                  <p className="text-muted-foreground">You haven't borrowed any books yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
