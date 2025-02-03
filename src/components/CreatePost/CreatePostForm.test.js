import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreatePostForm from './CreatePostForm';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../hooks/usePostMutations', () => ({
    useCreatePost: () => ({
      mutate: jest.fn(),
      isPending: false
    })
  }));

test('creates a new post and adds it to the list', () => {
  const queryClient = new QueryClient();
  const mockCreatePost = jest.fn();
  jest.spyOn(require('../../hooks/usePostMutations'), 'useCreatePost')
  .mockImplementation(() => ({
    mutate: mockCreatePost,
    isPending: false
  }));

  render(
    <QueryClientProvider client={queryClient}>
        <MemoryRouter >
            <CreatePostForm onCreate={mockCreatePost} />
        </MemoryRouter>
    </QueryClientProvider>
  );

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText(/Post title/i), { target: { value: 'New Post Title' } });
  fireEvent.change(screen.getByPlaceholderText(/Post content/i), { target: { value: 'New Post Content' } });

  // Simulate form submission
  fireEvent.click(screen.getByText(/Create Post/i));

  expect(mockCreatePost).toHaveBeenCalledWith({
    title: 'New Post Title',
    body: 'New Post Content',
  });
});