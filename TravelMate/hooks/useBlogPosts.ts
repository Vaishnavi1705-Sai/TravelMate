import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export function useBlogPosts(userId?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  async function fetchPosts() {
    try {
      setLoading(true);
      let query = supabase.from('blog_posts').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  async function createPost(title: string, content: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ title, content }])
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred');
    }
  }

  async function updatePost(id: string, updates: Partial<BlogPost>) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => prev.map(post => post.id === id ? data : post));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred');
    }
  }

  async function deletePost(id: string) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred');
    }
  }

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refresh: fetchPosts,
  };
}