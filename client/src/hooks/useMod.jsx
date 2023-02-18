import { useState } from "react";

const useMod = (initialValue) => {
	const [value, setValue] = useState(initialValue);
	const modal = () => {
		setValue(!value);
	};
	return [value, modal];
};

export { useMod };
