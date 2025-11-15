// src/data-config/userService.ts
import localforage from 'localforage';
import type { User, MapPolygon } from '../types/User';

const userStore = localforage.createInstance({ name: 'user_management_db', storeName: 'users' });
const mapStore = localforage.createInstance({ name: 'user_management_db', storeName: 'polygons' });

// ==========================================================
// USER CRUD FUNKSIYALARI
// ==========================================================

// CREATE
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(), 
    createdAt: Date.now(),
  };
  await userStore.setItem(newUser.id, newUser);
  return newUser;
};

// READ ALL
export const getUsers = async (): Promise<User[]> => {
  const users: User[] = [];
  await userStore.iterate<User, any>((value) => {
    users.push(value);
  });
  // Saralash: Eng yangi foydalanuvchilar yuqorida
  return users.sort((a, b) => b.createdAt - a.createdAt); 
};

// UPDATE
export const updateUser = async (user: User): Promise<User> => {
  await userStore.setItem(user.id, user);
  return user;
};

// DELETE
export const deleteUser = async (id: string): Promise<void> => {
  await userStore.removeItem(id);
};

// ==========================================================
// MAP POLYGON FUNKSIYALARI
// ==========================================================

export const createPolygon = async (coords: { lat: number; lng: number }[]): Promise<MapPolygon> => {
    const newPolygon: MapPolygon = {
        id: Date.now().toString(),
        coords,
        createdAt: Date.now(),
    };
    await mapStore.setItem(newPolygon.id, newPolygon);
    return newPolygon;
};

export const getPolygons = async (): Promise<MapPolygon[]> => {
    const polygons: MapPolygon[] = [];
    await mapStore.iterate<MapPolygon, any>((value) => {
        polygons.push(value);
    });
    return polygons;
};