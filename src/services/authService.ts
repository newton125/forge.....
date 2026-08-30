import { User, Address } from '../types';
import { INITIAL_USER } from '../data/mockData';
import { getStoredItem, setStoredItem, delay, ApiResponse } from './apiClient';

const USER_KEY = 'current_user';
const TOKEN_KEY = 'auth_token';

// Initial seed
if (!localStorage.getItem(`forge_${USER_KEY}`)) {
  setStoredItem(USER_KEY, INITIAL_USER);
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  company: string;
  jobTitle?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(300);
    let currentUser = getStoredItem<User>(USER_KEY, INITIAL_USER);
    
    // Check if logging in as admin or standard user
    if (credentials.email.toLowerCase().includes('admin')) {
      currentUser = {
        ...currentUser,
        fullName: 'Sarah Connor',
        email: credentials.email,
        role: 'admin',
        jobTitle: 'VP of Procurement & Plant Operations',
        company: 'FORGE Industrial Central'
      };
    } else {
      currentUser = {
        ...currentUser,
        email: credentials.email,
        role: 'customer'
      };
    }

    const token = `forge_jwt_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setStoredItem(USER_KEY, currentUser);
    localStorage.setItem(`forge_${TOKEN_KEY}`, token);

    return {
      data: { user: currentUser, token },
      success: true,
      message: 'Authentication successful'
    };
  },

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(350);
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company || 'Industrial Partner LLC',
      jobTitle: data.jobTitle || 'Procurement Specialist',
      role: 'customer',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          title: 'Primary Facility',
          fullName: data.fullName,
          company: data.company,
          street: '100 Industrial Way',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'United States',
          phone: data.phone,
          isDefault: true
        }
      ],
      preferences: {
        orderUpdatesEmail: true,
        orderUpdatesSms: true,
        promotionalOffers: false,
        inventoryAlerts: true
      }
    };

    const token = `forge_jwt_${Date.now()}`;
    setStoredItem(USER_KEY, newUser);
    localStorage.setItem(`forge_${TOKEN_KEY}`, token);

    return {
      data: { user: newUser, token },
      success: true,
      message: 'Account registered successfully'
    };
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    await delay(100);
    const user = getStoredItem<User | null>(USER_KEY, INITIAL_USER);
    return {
      data: user,
      success: true
    };
  },

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(250);
    const user = getStoredItem<User>(USER_KEY, INITIAL_USER);
    const updatedUser = { ...user, ...updates };
    setStoredItem(USER_KEY, updatedUser);
    return {
      data: updatedUser,
      success: true,
      message: 'Profile details saved'
    };
  },

  async addSavedAddress(address: Omit<Address, 'id'>): Promise<ApiResponse<Address[]>> {
    await delay(200);
    const user = getStoredItem<User>(USER_KEY, INITIAL_USER);
    const newAddress: Address = {
      ...address,
      id: `addr-${Date.now()}`
    };

    let updatedAddresses = [...user.savedAddresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    setStoredItem(USER_KEY, updatedUser);

    return {
      data: updatedAddresses,
      success: true,
      message: 'New address added to account'
    };
  },

  async updateSavedAddress(addressId: string, updates: Partial<Address>): Promise<ApiResponse<Address[]>> {
    await delay(200);
    const user = getStoredItem<User>(USER_KEY, INITIAL_USER);
    let updatedAddresses = user.savedAddresses.map((addr) => {
      if (addr.id === addressId) {
        return { ...addr, ...updates };
      }
      if (updates.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    setStoredItem(USER_KEY, updatedUser);

    return {
      data: updatedAddresses,
      success: true,
      message: 'Address updated'
    };
  },

  async deleteSavedAddress(addressId: string): Promise<ApiResponse<Address[]>> {
    await delay(150);
    const user = getStoredItem<User>(USER_KEY, INITIAL_USER);
    const updatedAddresses = user.savedAddresses.filter((a) => a.id !== addressId);
    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    setStoredItem(USER_KEY, updatedUser);

    return {
      data: updatedAddresses,
      success: true,
      message: 'Address removed'
    };
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(100);
    localStorage.removeItem(`forge_${TOKEN_KEY}`);
    return {
      data: null,
      success: true,
      message: 'Logged out'
    };
  },

  async requestPasswordReset(email: string): Promise<ApiResponse<{ sentTo: string }>> {
    await delay(300);
    return {
      data: { sentTo: email },
      success: true,
      message: 'A secure password reset link has been dispatched to your corporate email.'
    };
  }
};
