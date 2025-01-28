import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a post
export const createPost = async (newPost) => {
  try {
    const response = await client.post('/posts', newPost);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await client.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get a single post by ID
export const getPost = async (postId) => {
  try {
    const response = await client.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
};

// Update a post
export const updatePost = async (postId, updatedPost) => {
  try {
    const response = await client.put(`/posts/${postId}`, updatedPost);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    await client.delete(`/posts/${postId}`);
    return `Post with ID ${postId} deleted successfully`;
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error);
    throw error;
  }
};
