'use client';

import { create } from 'zustand';
import { deleteCookie } from 'cookies-next';

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        set({ user: null });
        deleteCookie('userID');
    },
}));

