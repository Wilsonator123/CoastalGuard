
export default function CaseDetails({ data }) {
    return (
        <>
            <p className="text-2xl font-semibold mb-3">Type of incident: {data.type}</p>
            <p className="text-2xl font-semibold mb-3">Casualty: {data.casualty}</p>
            <p className="text-2xl font-semibold mb-3">Teams: [{data.team.map((team, index) => {
                if(index === 0) return team;
                return `, ${team}`;
            })}]</p>
            <div>
                <p className="text-2xl font-semibold mb-2">Notes:</p>
                <div className="bg-white w-full h-36 border rounded-md p-2">
                    <p className="text-xl">{data.notes ? data.notes : "No notes available"}</p>
                </div>
            </div>
        </>
    )
}