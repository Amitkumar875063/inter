import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import AccountSettings from './components/AccountSettings';
import { User, Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<User | null>(null);

  const handleSignup = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setUser(newUser);
  };

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials
    const mockUser: User = {
      id: '12345',
      fullName: 'Marry Doe',
      email: 'Marry@Gmail.Com',
      phoneNumber: '+1 (555) 123-4567',
      companyName: 'Design Studio Inc.',
      isAgency: true,
      bio: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam'
    };
    setUser(mockUser);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  switch (currentScreen) {
    case 'welcome':
      return <Welcome onNavigate={handleNavigate} />;
    
    case 'signup':
      return (
        <Signup 
          onNavigate={handleNavigate} 
          onSignup={handleSignup}
        />
      );
    
    case 'login':
      return (
        <Login 
          onNavigate={handleNavigate} 
          onLogin={handleLogin}
        />
      );
    
    case 'account':
      return user ? (
        <AccountSettings 
          user={user}
          onNavigate={handleNavigate}
          onUpdateUser={handleUpdateUser}
        />
      ) : (
        <Welcome onNavigate={handleNavigate} />
      );
    
    default:
      return <Welcome onNavigate={handleNavigate} />;
  }
}

export default App;