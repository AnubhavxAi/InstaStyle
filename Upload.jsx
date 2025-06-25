import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const uploadPost = async () => {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    await supabase.storage.from('images').upload(fileName, image);
    const { publicURL } = supabase.storage.from('images').getPublicUrl(fileName);
    await supabase.from('posts').insert({
      username: user.email,
      caption,
      image_url: publicURL,
    });
    navigate('/feed');
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Upload Post</h2>
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={e => setCaption(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button onClick={uploadPost} className="w-full bg-purple-600 text-white py-2 rounded hover:opacity-90">
        Post
      </button>
    </div>
  );
}