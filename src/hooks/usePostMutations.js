import React from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost, deletePost } from "../api/client.js";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (old) => {
        return old ? [newPost, ...old] : [newPost];
      });
      navigate('/posts');
    },
    onError: (error) => {
      // Handle error (you can show a toast notification or alert)
      console.error('Error creating post:', error);
    }
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (old) => {
        return old?.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    },
    onError: (error) => {
      // Handle error
      console.error('Error updating post:', error);
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (deletedPostId) => {
      await queryClient.cancelQueries(['posts']);

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (old) => 
        old?.filter(post => post.id !== deletedPostId)
      );

      return { previousPosts };
    },
    onError: (error, variables, context) => {
      console.error('Error deleting post:', error);
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
    onSuccess: (deletedPostId) => {
      queryClient.invalidateQueries(['posts']);
    }
  });
};

