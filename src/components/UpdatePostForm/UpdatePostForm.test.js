import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdatePostForm from './UpdatePostForm';

test('UpdatePostForm test', () => {
  const mockUpdatePost = jest.fn();
  const mockHandleCancel = jest.fn();
  const mockSetEditedTitle = jest.fn();
  const mockSetEditedBody = jest.fn();

  render(
      <UpdatePostForm
          post={{ id: 1, title: 'Post Title', body: 'Post Content', userId: 123 }}
          setEditedTitle={mockSetEditedTitle}
          setEditedBody={mockSetEditedBody}
          handleUpdate={mockUpdatePost}
          handleCancel={mockHandleCancel}
      />
  );

  // Simulate user typing into the title and body fields
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Post Title' } });
  fireEvent.change(screen.getByLabelText(/body/i), { target: { value: 'Updated Post Content' } });

  // Trigger the update event
  fireEvent.click(screen.getByText(/update/i));
  expect(mockUpdatePost).toHaveBeenCalled();
});

