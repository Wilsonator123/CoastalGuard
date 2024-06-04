import CasesTable from "./casesTable";

const fetchData = async () => {
	const req = await fetch(process.env.API_URL + "/case/get-cases");
	const res = await req.json();
	let data = res.data;
	data = data.filter(
		(obj, index, self) =>
			index === self.findIndex((el) => el.gin === obj.gin)
	);
	return data.sort((a, b) => new Date(b.sent) - new Date(a.sent));
};

export default async function Page() {
	const data = await fetchData();

	return <CasesTable data={data} />;
}
