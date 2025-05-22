
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Menu, User, X, BookOpen, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NavbarProps {
  onOpenAuthModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'librarian' | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check auth state on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        
        // Get user role from profiles table
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          setUserRole(data.role as 'student' | 'librarian');
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoggedIn(!!session);
        
        if (session) {
          // Get user role from profiles table
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (data) {
            setUserRole(data.role as 'student' | 'librarian');
          }
        } else {
          setUserRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserRole(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-bookbank-primary" />
          <span className="text-xl font-serif font-bold text-bookbank-primary">ReadEasyBank</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link font-medium">Home</Link>
          <Link to="/books" className="nav-link font-medium">Browse Books</Link>
          {userRole === 'librarian' && isLoggedIn && (
            <Link to="/admin" className="nav-link font-medium">Admin</Link>
          )}
          <Link to="/about" className="nav-link font-medium">About Us</Link>
          <Link to="/contact" className="nav-link font-medium">Contact</Link>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <Button 
              variant="default"
              className="bg-bookbank-primary hover:bg-bookbank-primary/90"
              onClick={onOpenAuthModal}
            >
              Sign In
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center space-x-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                Sign Out
              </Button>
              {userRole && (
                <span className="text-sm text-muted-foreground">
                  ({userRole})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/books" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Browse Books</Link>
            {userRole === 'librarian' && isLoggedIn && (
              <Link to="/admin" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            )}
            <Link to="/about" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            <div className="pt-2 border-t border-gray-200">
              {!isLoggedIn ? (
                <Button 
                  variant="default" 
                  className="w-full bg-bookbank-primary hover:bg-bookbank-primary/90"
                  onClick={() => {
                    onOpenAuthModal();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                  {userRole && (
                    <div className="text-center text-sm text-muted-foreground">
                      Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
