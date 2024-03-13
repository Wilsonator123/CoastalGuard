import './globals.css'
import Image from "next/image";
import AccountIcon  from "@/assets/account.svg";

export default function Header() {
    return (
        <div className="flex items-center justify-between p-2 bg-accent mb-5">
            <h1 className="text-4xl font-semibold text-background">Situational Awareness for the CoastGuard</h1>
            <AccountIcon width={90} height={90} fill={"#fff"}/>
        </div>
    )
}