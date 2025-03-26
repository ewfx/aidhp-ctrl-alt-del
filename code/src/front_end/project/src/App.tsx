import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigation } from "./components/Navigation";
import { TopBar } from "./components/TopBar";
import { Chatbot } from "./components/Chatbot";
import { HomePage } from "./pages/HomePage";
import { AccountsPage } from "./pages/AccountsPage";
import { CardsPage } from "./pages/CardsPage";
import { LoansPage as InsurancePage } from "./pages/LoansPage";
import { InvestmentsPage } from "./pages/InvestmentsPage";
import { OffersPage } from "./pages/OffersPage";
import { LoginPage } from "./pages/LoginPage";

// Define the User type
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  income: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date_of_birth: string;
  isLoggedIn: boolean;
}

// Create Auth Context
interface AuthContextType {
  user: User | null;
  login: (credentials: { id: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Auth Provider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing user data
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  const login = async (credentials: { id: string; password: string }) => {
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(data));
        setUser(data);
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call the signout endpoint
      await fetch('api/signout', {
        method: 'POST',
      });
      
      // Clear user data from localStorage
      localStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <TopBar />
          <Navigation />

          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/accounts" element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              } />
              <Route path="/cards" element={
                <ProtectedRoute>
                  <CardsPage />
                </ProtectedRoute>
              } />
              <Route path="/insurance" element={
                <ProtectedRoute>
                  <InsurancePage />
                </ProtectedRoute>
              } />
              <Route path="/investments" element={
                <ProtectedRoute>
                  <InvestmentsPage />
                </ProtectedRoute>
              } />
              <Route path="/offers" element={
                <ProtectedRoute>
                  <OffersPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
