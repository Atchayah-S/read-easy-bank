
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@/types";

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: 'student' | 'librarian';
  avatar: string | null;
  created_at: string;
}

export const fetchUsers = async (): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data as UserProfile[];
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users");
    return [];
  }
};

export const updateUserRole = async (userId: string, role: 'student' | 'librarian'): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    toast.success(`User role updated to ${role} successfully`);
    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    toast.error("Failed to update user role");
    return false;
  }
};

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("You must be logged in to update your profile");
      return false;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        avatar: profile.avatar
      })
      .eq('id', session.user.id);
    
    if (error) {
      throw error;
    }
    
    toast.success("Profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile");
    return false;
  }
};
