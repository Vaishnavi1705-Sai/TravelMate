export interface User {
    id: string;
    email: string;
    name: string | null;
    created_at: string;
  }
  
  export interface BlogPost {
    id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Profile {
    id: string;
    user_id: string;
    name: string;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
  }