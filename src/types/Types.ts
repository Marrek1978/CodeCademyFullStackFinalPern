export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  phone?: string;
}

export interface CardData {
  cardnumber: string;
  expirationdate: string;
  cvv?: string;
}