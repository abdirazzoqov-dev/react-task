// src/types/User.ts

export type Gender = 'Female' | 'Male' | 'Others';

export interface User {
  id: string; 
  firstName: string;
  lastName: string;
  birthdate: string; 
  gender: Gender;
  createdAt: number; 
}