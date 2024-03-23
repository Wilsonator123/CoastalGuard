import CasesTable from './casesTable';

const fetchData = async () => {
    const res = await fetch(process.env.API_URL + '/get-cases');
    const data = await res.json();
    return data;
}
export default async function Page() {
    const data = await fetchData();

    return (
        <CasesTable data={data}/>
    );

}




