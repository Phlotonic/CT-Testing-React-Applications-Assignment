import React, { useState } from 'react';
import { useCreatePost } from '../../hooks/usePostMutations';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const createPostMutation = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body });
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.5rem',
      fontSize: '1rem',
    },
    textarea: {
      padding: '0.5rem',
      fontSize: '1rem',
      minHeight: '150px',
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          style={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          style={styles.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post content"
          required
        />
        <button
          type="submit"
          style={styles.button}
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
