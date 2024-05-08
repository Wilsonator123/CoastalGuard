'use client'

import '../globals.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import AccountIcon  from "@/assets/account.svg";
import { useUserStore } from "@/stores/userStore";
import { updateUser } from "@/hooks/user";
import {DropDown} from "./dropdown";
import DropDownArrow from "@/assets/dropdown.svg";

export default function Header() {
    const [show, setShow] = useState(false)
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            await updateUser().then(
                setShowHeader(true)
            )
        }
        fetchUser()
    }, [])

    const toggle = () => {
        setShow(!show)
    }
    const user = useUserStore(state => state.user);

    return (
        <div className="flex items-center justify-between p-2 bg-accent mb-5">
            <h1 className="text-4xl font-semibold text-background">Situational Awareness for the CoastGuard</h1>
            {showHeader &&
                <div onClick={toggle} className="relative rounded">
                    <div className="flex text-white p-2 text-lg items-center">
                        {user ? <h1 className="font-bold self-center text-xl"> Hello {user.first_name} </h1> : <h1 className="font-bold self-center text-xl">Hello Guest</h1>}
                        <DropDownArrow fill={"white"} width="30" height="30"/>
                    </div>
                    {show && <DropDown />}
                </div>
            }
        </div>
    )
}