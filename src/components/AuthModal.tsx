
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would authenticate with a backend
    // For now, we'll just simulate a successful login
    
    const isLibrarian = loginForm.email.includes('admin') || loginForm.email.includes('librarian');
    
    toast({
      title: "Login Successful",
      description: "Welcome back to ReadEasyBank!",
    });
    
    onClose();
    
    // Navigate to the appropriate dashboard based on user role
    if (isLibrarian) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would register with a backend
    toast({
      title: "Registration Successful",
      description: "Your account has been created. Welcome to ReadEasyBank!",
    });
    
    onClose();
    navigate('/dashboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Welcome to ReadEasyBank</DialogTitle>
          <DialogDescription>
            Access your account to borrow books and view your reading history.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" value={activeTab} onValueChange={(val) => setActiveTab(val as 'login' | 'register')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={loginForm.email}
                  onChange={handleLoginFormChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-bookbank-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={loginForm.password}
                  onChange={handleLoginFormChange}
                  required 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-bookbank-primary hover:bg-bookbank-primary/90"
              >
                Login
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <p>For admin access: admin@example.com / password</p>
                <p>For student access: student@example.com / password</p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={registerForm.firstName}
                    onChange={handleRegisterFormChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={handleRegisterFormChange}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="regEmail">Email</Label>
                <Input 
                  id="regEmail" 
                  name="email"
                  type="email" 
                  placeholder="you@example.com" 
                  value={registerForm.email}
                  onChange={handleRegisterFormChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regPassword">Password</Label>
                <Input 
                  id="regPassword" 
                  name="password"
                  type="password" 
                  value={registerForm.password}
                  onChange={handleRegisterFormChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterFormChange}
                  required 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <a href="#" className="text-bookbank-primary hover:underline">terms and conditions</a>
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-bookbank-primary hover:bg-bookbank-primary/90"
              >
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
