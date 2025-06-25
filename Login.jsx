import { supabase } from '../services/supabase';

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <button onClick={signInWithGoogle} className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90">
        Sign in with Google
      </button>
    </div>
  );
}