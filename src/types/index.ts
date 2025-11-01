// User Role Types
export type UserRole = 'admin' | 'user';

// User Type
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: UserRole;
}

// Auth State
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
