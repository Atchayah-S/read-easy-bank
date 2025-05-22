
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
