'use client'

import { useUserStore } from '@/stores/userStore';
import { getUser } from '@/hooks/fetchUser';
export async function updateUser() {
    const user = await getUser('test')
    if (user) {
        useUserStore.getState().setUser(user);
        return true;
    }
    return false;
}

