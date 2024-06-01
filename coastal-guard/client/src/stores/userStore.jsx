'use client';

import { create } from 'zustand';
import { deleteCookie } from 'cookies-next';

export const useUserStore = create((set) => ({
    user: { name: 'Guest' },
    setUser: (user) => set({ user }),
    logout: () => {
        console.log('logging out')
        set({ user: null });
        deleteCookie('userID');
    },
}));

