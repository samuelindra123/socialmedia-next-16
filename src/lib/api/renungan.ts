import { Renungan, CreateRenunganInput, UpdateRenunganInput, ApiResponse, PaginatedResponse } from '@/types/renungan';

const API_BASE_URL = '/api/renungan';

/**
 * Fetch all Renungan with pagination
 */
export async function getRenungans(page = 1, pageSize = 10): Promise<PaginatedResponse<Renungan>> {
  const response = await fetch(`${API_BASE_URL}?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Failed to fetch renungans');
  return response.json();
}

/**
 * Fetch single Renungan by ID
 */
export async function getRenunganById(id: string): Promise<Renungan> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch renungan');
  const data = await response.json();
  return data.data;
}

/**
 * Create new Renungan
 */
export async function createRenungan(input: CreateRenunganInput): Promise<ApiResponse<Renungan>> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return response.json();
}

/**
 * Update existing Renungan
 */
export async function updateRenungan(id: string, input: UpdateRenunganInput): Promise<ApiResponse<Renungan>> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return response.json();
}

/**
 * Delete Renungan
 */
export async function deleteRenungan(id: string): Promise<ApiResponse<void>> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

/**
 * Like/Unlike Renungan
 */
export async function toggleLike(renunganId: string): Promise<ApiResponse<void>> {
  const response = await fetch(`${API_BASE_URL}/${renunganId}/like`, {
    method: 'POST',
  });
  return response.json();
}

/**
 * Get user's own Renungans
 */
export async function getMyRenungans(): Promise<Renungan[]> {
  const response = await fetch(`${API_BASE_URL}/my-posts`);
  if (!response.ok) throw new Error('Failed to fetch your renungans');
  const data = await response.json();
  return data.data;
}
