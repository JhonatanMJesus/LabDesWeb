export type UserProfile = 'Admin' | 'User';

export interface User {
  id: string | number;
  nome: string;
  email: string;
  perfil: UserProfile;
}
