import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel('realtime-posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => fetchPosts())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data);
  };

  return (
    <div className="p-6 max-w-prose mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Feed</h2>
      {posts.map(post => (
        <div key={post.id} className="border rounded-lg p-4 bg-white shadow">
          <p className="font-bold">{post.username}</p>
          <img src={post.image_url} alt="post" className="mt-2 w-full rounded" />
          <p className="mt-2 text-gray-700">{post.caption}</p>
        </div>
      ))}
    </div>
  );
}