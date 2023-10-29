import { IrisData } from "./useData";

export const Dropdown = ({
	options,
	id,
	selectedValue,
	onSelectedValueChange,
}: {
	options: { value: string; label: string }[];
	id: string;
	selectedValue: string;
	onSelectedValueChange: React.Dispatch<
		React.SetStateAction<keyof Omit<IrisData, "species">>
	>;
}) => {
	return (
		<select
			id={id}
			value={selectedValue}
			onChange={(event) =>
				onSelectedValueChange(
					event?.target.value as keyof Omit<IrisData, "species">
				)
			}
		>
			{options.map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	);
};
