// src/store/userStore.ts
import { create } from 'zustand';
import type { User } from '../types/User';
import * as userService from '../api/userService'; // Service qatlamini import qilish

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (data: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  removeUser: (id: string, reason: string) => Promise<void>; // Delete modal talabini hisobga olamiz
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (err) {
      set({ error: "Foydalanuvchilarni yuklashda xatolik yuz berdi.", isLoading: false });
    }
  },

  addUser: async (data) => {
    set({ isLoading: true });
    try {
      const newUser = await userService.createUser(data);
      // IndexedDB yangilangach, store ni ham yangilaymiz
      set((state) => ({ 
        users: [newUser, ...state.users], 
        isLoading: false 
      }));
    } catch (err) {
      set({ error: "Foydalanuvchini qo'shishda xatolik yuz berdi.", isLoading: false });
    }
  },

  editUser: async (user) => {
    set({ isLoading: true });
    try {
      const updatedUser = await userService.updateUser(user);
      set((state) => ({
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Foydalanuvchini tahrirlashda xatolik yuz berdi.", isLoading: false });
    }
  },

  removeUser: async (id, reason) => {
    // Esda tuting: 'reason' faqat serverga/logga yuborilishi kerak.
    console.log(`Foydalanuvchi o'chirildi. Sababi: ${reason}`); 
    set({ isLoading: true });
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Foydalanuvchini o'chirishda xatolik yuz berdi.", isLoading: false });
    }
  },
}));