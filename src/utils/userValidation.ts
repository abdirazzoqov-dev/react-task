// src/utils/userValidation.ts
import { z } from 'zod';

export const UserFormSchema = z.object({
  firstName: z.string().min(2, "Ism kamida 2ta belgidan iborat bo'lishi kerak.").max(50),
  lastName: z.string().min(2, "Familiya kamida 2ta belgidan iborat bo'lishi kerak.").max(50),
  // Tug'ilgan kun (sana formatini tekshirish)
  birthdate: z.string().refine((date) => {
    // Oddiy YYYY-MM-DD formatida validatsiya
    return !isNaN(new Date(date).getTime()); 
  }, "Noto'g'ri sana formati (YYYY-MM-DD)"), // Assuming YYYY-MM-DD for simplicity
  gender: z.enum(['Female', 'Male', 'Others'], {
    error: "Jinsni tanlash majburiy."
  }), 
});

// TypeScript turlarini Zod sxemasidan olish
export type UserFormInput = z.infer<typeof UserFormSchema>;