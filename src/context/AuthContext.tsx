import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';
import { authService, LoginCredentials, RegisterData } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  switchRole: (role: 'customer' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { success, error, info } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await authService.getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await authService.login(credentials);
      setUser(res.data.user);
      success('Welcome back to FORGE', `Signed in as ${res.data.user.fullName}`);
    } catch (err: any) {
      error('Authentication Error', err.message || 'Failed to sign in');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await authService.register(data);
      setUser(res.data.user);
      success('Account Created', `Welcome to FORGE Industrial, ${res.data.user.fullName}`);
    } catch (err: any) {
      error('Registration Error', err.message || 'Failed to create account');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      info('Signed out', 'You have been safely signed out of your industrial session.');
    } catch (err: any) {
      error('Error', 'Failed to sign out');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const res = await authService.updateProfile(updates);
      setUser(res.data);
      success('Profile Updated', 'Your enterprise details were saved.');
    } catch (err: any) {
      error('Error', err.message || 'Failed to update profile');
      throw err;
    }
  };

  const addAddress = async (address: Omit<Address, 'id'>) => {
    try {
      const res = await authService.addSavedAddress(address);
      if (user) {
        setUser({ ...user, savedAddresses: res.data });
      }
      success('Address Added', 'New delivery location saved.');
    } catch (err: any) {
      error('Error', err.message || 'Failed to add address');
      throw err;
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      const res = await authService.updateSavedAddress(id, address);
      if (user) {
        setUser({ ...user, savedAddresses: res.data });
      }
      success('Address Updated', 'Changes saved successfully.');
    } catch (err: any) {
      error('Error', err.message || 'Failed to update address');
      throw err;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const res = await authService.deleteSavedAddress(id);
      if (user) {
        setUser({ ...user, savedAddresses: res.data });
      }
      info('Address Removed', 'The facility address was deleted.');
    } catch (err: any) {
      error('Error', err.message || 'Failed to delete address');
      throw err;
    }
  };

  const switchRole = async (role: 'customer' | 'admin') => {
    if (!user) return;
    const updated = {
      ...user,
      role,
      fullName: role === 'admin' ? 'Sarah Connor (Admin)' : 'John Doe',
      jobTitle: role === 'admin' ? 'VP of Plant Operations' : 'Senior Maintenance Engineer'
    };
    await authService.updateProfile(updated);
    setUser(updated);
    info(
      role === 'admin' ? 'Switched to Admin Portal' : 'Switched to Storefront Buyer Mode',
      `Active role is now ${role.toUpperCase()}`
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
