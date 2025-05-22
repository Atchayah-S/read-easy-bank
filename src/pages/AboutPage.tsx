
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Users, Calendar, History, School } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOpenAuthModal={() => {}} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-center">About ReadEasyBank</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-bookbank-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                ReadEasyBank is dedicated to making educational resources accessible to all students. 
                Our library management system streamlines the process of borrowing and returning books, 
                helping educational institutions manage their resources more efficiently.
              </p>
              <p>
                We believe that access to knowledge should be simple, straightforward, and available 
                to everyone who seeks it. Our platform is designed to remove barriers between students 
                and the resources they need to succeed.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-bookbank-primary" />
                  Our History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Founded in 2024, ReadEasyBank began as a project to modernize library systems 
                  in educational institutions. We identified common pain points in traditional 
                  library management and developed a solution that emphasizes user experience 
                  and efficiency.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-bookbank-primary" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our team consists of educators, librarians, and software developers who are 
                  passionate about education and technology. We work closely with schools and 
                  universities to ensure our platform meets the needs of all stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-bookbank-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We envision a future where every student has equal access to educational resources. 
                ReadEasyBank is committed to continuous improvement, regularly updating our platform 
                based on user feedback and technological advancements.
              </p>
              <p>
                In the coming years, we plan to expand our services to include digital resource 
                management, research assistance tools, and integration with educational platforms 
                to create a comprehensive learning ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
