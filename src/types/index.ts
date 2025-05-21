
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'librarian';
  avatar?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string[];
  publishedYear: number;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
}

export interface BorrowHistory {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  returnDate: string;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface Reservation {
  id: string;
  bookId: string;
  userId: string;
  reservationDate: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
}
