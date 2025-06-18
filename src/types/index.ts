export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  isAgency: boolean;
  bio?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type Screen = 'welcome' | 'login' | 'signup' | 'account';