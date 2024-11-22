export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
} 