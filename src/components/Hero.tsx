
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-bookbank-primary/10 to-bookbank-accent/10">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bookbank-dark mb-6">
            Find Your Next Great Book With <span className="text-bookbank-primary">ReadEasyBank</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Access thousands of textbooks and resources through our automated system.
            Reserve, borrow, and return with ease.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/books">
              <Button 
                className="bg-bookbank-primary hover:bg-bookbank-primary/90 text-white px-8 py-6 rounded-md flex items-center space-x-2 w-full sm:w-auto"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Books
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline"
                className="border-bookbank-primary text-bookbank-primary hover:bg-bookbank-primary/10 px-8 py-6 rounded-md flex items-center space-x-2 w-full sm:w-auto"
                size="lg"
              >
                <Book className="h-5 w-5 mr-2" />
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
