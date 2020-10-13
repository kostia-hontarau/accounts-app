export interface Account {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  passwordHash: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AccountRegistrationRequest {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  password: string;
}

export interface AccountUpdateRequest {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
  oldPassword: string;
  newPassword?: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}
