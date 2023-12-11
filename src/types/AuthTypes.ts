export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
}

export interface CardData {
  cardNumber: string;
  expirationDate: string;
  cvv?: string;
}