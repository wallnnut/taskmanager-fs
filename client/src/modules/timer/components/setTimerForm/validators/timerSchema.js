import * as yup from "yup";

export const timerSchema = yup.object().shape({
	seconds: yup
		.number()
		.min(0, "Минимально возможное значение 0")
		.max(59, "Максимально возможное значение 59"),
	minutes: yup
		.number()
		.min(0, "Минимально возможное значение 0")
		.max(59, "Максимально возможное значение 59"),
	hours: yup
		.number()
		.min(0, "Минимально возможное значение 0")
		.max(24, "Максимально возможное значение 24"),
});
