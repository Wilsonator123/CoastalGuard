import Case from './case';
const fetchData = async (gin) => {
    'use server'
    const res = await fetch(process.env.API_URL + '/get-case/'+gin);
    const data = await res.json();
    return data;
}

export default function Page({params}) {
    return (
        <>
            <Case fetchData={fetchData} params={params}/>
        </>
    );
}