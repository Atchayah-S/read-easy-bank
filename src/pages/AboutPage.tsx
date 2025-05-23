
import React from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Users, Building, Award } from 'lucide-react';

const AboutPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-6">About ReadEasyBank</h1>
          
          <div className="prose max-w-none mb-10">
            <p className="text-lg mb-6">
              ReadEasyBank is a modern library management system designed specifically for educational institutions. 
              Our mission is to make books and educational resources accessible to students in an efficient and 
              user-friendly manner.
            </p>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-bookbank-primary/10 flex items-center justify-center mb-4">
                      <Book className="h-8 w-8 text-bookbank-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Our Collection</h3>
                    <p>
                      We maintain a comprehensive collection of over 10,000 academic textbooks, reference materials, 
                      and digital resources covering all fields of study.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-bookbank-secondary/10 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-bookbank-secondary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Our Community</h3>
                    <p>
                      We serve a vibrant community of students, faculty, and staff, facilitating knowledge sharing 
                      and academic excellence through our resources.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-medium mb-4">Our History</h2>
            <p className="mb-6">
              ReadEasyBank was established in 2015 with the vision of transforming traditional library services 
              into a modern, digital-first experience. What started as a small collection of digital resources 
              has grown into a comprehensive library management system used by educational institutions across 
              the country.
            </p>
            
            <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to bridge the gap between traditional library services and modern technology, 
              making educational resources more accessible, manageable, and engaging for students and faculty alike.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <Building className="h-10 w-10 text-bookbank-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Our Values</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Accessibility for all students</li>
                  <li>Innovation in library services</li>
                  <li>Excellence in educational support</li>
                  <li>Community engagement and collaboration</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <Award className="h-10 w-10 text-bookbank-secondary mb-4" />
                <h3 className="text-xl font-medium mb-2">Awards & Recognition</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Best Library Management System 2022</li>
                  <li>Educational Technology Innovation Award 2021</li>
                  <li>Student Choice Award 2020</li>
                  <li>Digital Transformation Excellence 2019</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default AboutPage;
