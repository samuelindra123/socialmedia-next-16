// Renungan (Post) Types
export interface Renungan {
  id: string;
  title: string;
  content: string;
  verse: string; // Bible verse reference
  verseText: string; // Actual verse text
  authorId: string;
  authorName: string;
  authorImage?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: number;
  isPublished: boolean;
}

// Create Renungan Input
export interface CreateRenunganInput {
  title: string;
  content: string;
  verse: string;
  verseText: string;
  isPublished?: boolean;
}

// Update Renungan Input
export interface UpdateRenunganInput {
  title?: string;
  content?: string;
  verse?: string;
  verseText?: string;
  isPublished?: boolean;
}

// Comment Types
export interface Comment {
  id: string;
  renunganId: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Like Types
export interface Like {
  id: string;
  renunganId: string;
  userId: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
