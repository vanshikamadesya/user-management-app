export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  dob: string;
  gender: string;
  profile?: File | null;
}