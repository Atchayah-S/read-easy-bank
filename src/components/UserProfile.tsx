
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, BookOpen, Calendar } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
    joinDate?: string;
    booksRead?: number;
    currentlyBorrowed?: number;
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-bookbank-primary/10 text-bookbank-primary">
            <User className="w-12 h-12" />
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-medium">{user.name}</h3>
            <div className="flex items-center justify-center sm:justify-start text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bookbank-primary/10 text-bookbank-primary">
                {user.role === 'student' ? 'Student' : 'Librarian'}
              </span>
              {user.joinDate && (
                <span className="ml-2 text-xs text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-3 w-3" /> 
                  Joined {new Date(user.joinDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex flex-col items-center p-3 bg-bookbank-primary/5 rounded-md">
            <BookOpen className="h-5 w-5 text-bookbank-primary mb-1" />
            <span className="text-lg font-medium">{user.booksRead || 0}</span>
            <span className="text-xs text-muted-foreground">Books Read</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-bookbank-primary/5 rounded-md">
            <BookOpen className="h-5 w-5 text-bookbank-primary mb-1" />
            <span className="text-lg font-medium">{user.currentlyBorrowed || 0}</span>
            <span className="text-xs text-muted-foreground">Currently Borrowed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
