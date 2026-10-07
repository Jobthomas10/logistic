import { supabase } from '../utils/supabase';

/**
 * Sign up a new user with email and password
 */
export async function signUp({ email, password, name, phone, role = 'driver', company_name = '' }) {
  if (!supabase) return { error: { message: 'Supabase client not initialized' } };

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role,
          company_name
        }
      }
    });

    if (error) throw error;

    // If user created, attempt profile insert
    if (data?.user) {
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: name || 'LorryMitra Driver',
          email,
          phone: phone || '',
          role: role || 'driver',
          company_name: company_name || '',
          updated_at: new Date().toISOString()
        });
      } catch (profileErr) {
        console.warn('Profile table setup note:', profileErr);
      }
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn({ email, password }) {
  if (!supabase) return { error: { message: 'Supabase client not initialized' } };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  if (!supabase) return { error: null };
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Get current session
 */
export async function getSession() {
  if (!supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.warn('Get session error:', err);
    return null;
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  if (!supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.warn('Get user error:', err);
    return null;
  }
}

/**
 * Get user profile details from public.profiles
 */
export async function getUserProfile(userId) {
  if (!supabase || !userId) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('Profile query notice:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Get user profile error:', err);
    return null;
  }
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
  if (!supabase) return { unsubscribe: () => {} };
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return subscription;
}
