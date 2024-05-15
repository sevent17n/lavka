export interface User {
  id: number;
  email: string;
  fio: string;
  phone: string;
  isAdmin: boolean;
  balance: number;
}

export interface TokenPair {
  refreshToken: string;
  accessToken: string;
}

export interface AuthResponse extends TokenPair {
  user: User;
}
