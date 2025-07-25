import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

function Dashboard() {
  const { user } = useAuth();
  const { posts, loading, error, deletePost } = useBlogPosts(user?.id);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Travel Blog Posts</h1>
        <Link
          to="/blog/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          New Post
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/blog/edit/${post.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No blog posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;