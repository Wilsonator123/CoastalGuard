import Plus from "@/assets/plus.svg";

export default function Default({ add, position, edit }) {
	return (
		<div
			className="flex h-full w-full relative border border-secondary rounded-lg items-center justify-center z-0"
			onClick={() => {
				edit && add(true, position);
			}}
		>
			<Plus width={100} height={100} />
		</div>
	);
}
