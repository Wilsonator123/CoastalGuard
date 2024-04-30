'use client'

import React from "react";
import { useUserStore } from '@/stores/userStore';

export function DropDown({loggedIn}) {
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    return (
        <div className="select-none">
            {loggedIn ?
                <div className="absolute bg-background flex flex-col">
                    <button className="" onClick={logout}>Logout</button>
                </div>
                : <div className="absolute bg-background flex flex-col">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            }
        </div>
    )

}