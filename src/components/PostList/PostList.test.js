import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchPosts } from '../../api/client.js';
import { useUpdatePost, useDeletePost } from '../hooks/usePostMutations';
import PostList from './PostList';

// Mock API functions
jest.mock('../../api/client.js', () => ({
  fetchPosts: jest.fn(),
}));

// Mock mutations hooks
jest.mock('../../hooks/usePostMutations', () => ({
  useUpdatePost: jest.fn(),
  useDeletePost: jest.fn(),
}));

const queryClient = new QueryClient();

test('renders posts and handles editing and deleting', async () => {
  const posts = [
    { id: 1, title: 'Post 1', body: 'Content 1' },
    { id: 2, title: 'Post 2', body: 'Content 2' },
  ];

  fetchPosts.mockResolvedValue(posts);

  const updatePostMutation = { mutate: jest.fn() };
  const deletePostMutation = { mutate: jest.fn() };

  useUpdatePost.mockReturnValue(updatePostMutation);
  useDeletePost.mockReturnValue(deletePostMutation);

  render(
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );

  await waitFor(() => screen.getByText('Post 1'));

  // Check if posts are rendered
  expect(screen.getByText('Post 1')).toBeInTheDocument();
  expect(screen.getByText('Post 2')).toBeInTheDocument();

  // Simulate clicking "Edit" on Post 1
  fireEvent.click(screen.getByText('Edit'));

  // Check if editing form appears
  expect(screen.getByDisplayValue('Post 1')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Content 1')).toBeInTheDocument();

  // Simulate editing and submitting the post
  fireEvent.change(screen.getByDisplayValue('Post 1'), { target: { value: 'Updated Post 1' } });
  fireEvent.change(screen.getByDisplayValue('Content 1'), { target: { value: 'Updated Content 1' } });
  fireEvent.click(screen.getByText('Update'));

  expect(updatePostMutation.mutate).toHaveBeenCalledWith({
    id: 1,
    title: 'Updated Post 1',
    body: 'Updated Content 1',
  });

  // Simulate clicking "Delete" on Post 2
  fireEvent.click(screen.getByText('Delete'));

  expect(deletePostMutation.mutate).toHaveBeenCalledWith(2);
});

