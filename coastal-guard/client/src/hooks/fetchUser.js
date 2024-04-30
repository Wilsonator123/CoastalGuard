'use server'
import { cookies } from 'next/headers'
export const getUser= async () => {
    'use server'
    try{
        const id = cookies().get('userID')
        if(!id) return false
        const response = await fetch(process.env.API_URL + `/user/get-user?id=${id}`);
        return await response.json();
    } catch (error) {
        return false;
    }
}
