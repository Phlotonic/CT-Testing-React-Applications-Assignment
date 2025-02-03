import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCreatePost } from './hooks/usePostMutations';
import CreatePostForm from './components/CreatePost/CreatePostForm';

// Mock the useCreatePost hook
jest.mock('./hooks/usePostMutations', () => ({
  useCreatePost: jest.fn(),
}));

test('renders CreatePostForm and handles form submission', () => {
  const mockCreatePost = jest.fn();
  useCreatePost.mockReturnValue({ mutate: mockCreatePost });

  render(<CreatePostForm />);

  // Check if form is rendered
  expect(screen.getByLabelText('Title')).toBeInTheDocument();
  expect(screen.getByLabelText('Body')).toBeInTheDocument();

  // Simulate form input
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByLabelText('Body'), { target: { value: 'This is a new post content' } });

  // Simulate form submission
  fireEvent.click(screen.getByText('Create Post'));

  // Assert the mutation function was called with correct data
  expect(mockCreatePost).toHaveBeenCalledWith({
    title: 'New Post',
    body: 'This is a new post content',
  });
});

