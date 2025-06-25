import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.email}</h1>
      <div className="flex space-x-4">
        <Link to="/feed" className="flex-1 text-center bg-blue-500 text-white py-2 rounded">View Feed</Link>
        <Link to="/upload" className="flex-1 text-center bg-green-500 text-white py-2 rounded">Upload Post</Link>
      </div>
    </div>
  );
}