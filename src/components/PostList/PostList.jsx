import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/client.js';
import { useUpdatePost, useDeletePost } from '../../hooks/usePostMutations.js';

const PostList = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleUpdate = (post) => {
    updatePostMutation.mutate({
      ...post,
      title: editedTitle,
      body: editedBody
    });
    setEditingPost(null);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditedTitle('');
    setEditedBody('');
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    postList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    postItem: {
      padding: '1rem',
      backgroundColor: 'black',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    button: {
      padding: '0.5rem 1rem',
      marginRight: '0.5rem',
      fontSize: '0.875rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    editButton: {
      backgroundColor: '#2196F3',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white'
    }
  };

  if (isLoading) return <div>Loading posts...</div>;

  return (
    <div style={styles.container}>
      <h1>Posts</h1>
      <ul style={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} style={styles.postItem}>
            {editingPost === post.id ? (
              <EditPostForm
                post={post}
                editedTitle={editedTitle}
                editedBody={editedBody}
                setEditedTitle={setEditedTitle}
                setEditedBody={setEditedBody}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
              />
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button 
                  style={{...styles.button, ...styles.editButton}}
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button 
                  style={{...styles.button, ...styles.deleteButton}}
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;