import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Callback error:', error);
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
          return;
        }

        if (session) {
          // Check if user profile exists
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            // Error other than "not found"
            console.error('Profile fetch error:', profileError);
          }

          if (!userProfile) {
            // Create user profile from OAuth data
            const fullName = session.user.user_metadata.full_name || 
                            session.user.user_metadata.name || 
                            session.user.email?.split('@')[0] || 
                            'User';

            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email || '',
                name: fullName,
                phone: session.user.user_metadata.phone || session.user.phone || '',
                role: 'user',
                email_verified: true,
              });

            if (insertError) {
              console.error('Profile creation error:', insertError);
              // Continue anyway - user is authenticated
            }
          }

          toast.success('Login successful! Welcome back.');
          navigate('/dashboard');
        } else {
          toast.error('No session found. Please try again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        toast.error('An error occurred. Please try again.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we set up your account</p>
      </div>
    </div>
  );
}
