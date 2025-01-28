import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreatePostForm from './CreatePostForm';

test('creates a new post and adds it to the list', () => {
  const queryClient = new QueryClient();
  const mockCreatePost = jest.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <CreatePostForm onCreate={mockCreatePost} />
    </QueryClientProvider>
  );

  // Simulate user input
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post Title' } });
  fireEvent.change(screen.getByLabelText(/body/i), { target: { value: 'New Post Content' } });

  // Simulate form submission
  fireEvent.click(screen.getByRole('button', { name: /create/i }));

  expect(mockCreatePost).toHaveBeenCalledWith({
    title: 'New Post Title',
    body: 'New Post Content',
  });
});

