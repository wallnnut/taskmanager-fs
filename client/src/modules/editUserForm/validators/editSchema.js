import moment from "moment";
import * as yup from "yup";

export const editSchema = yup.object().shape({
	birthDate: yup
		.number()
		.required("Дата рождения обязательна для запаолнения")
		.max(
			moment().valueOf(),
			"Дата рождения не можеть быть больше текущей даты"
		),
	name: yup
		.string()
		.required("Введите ваше имя")
		.min(2, "Имя должно включать в себя не менее 2 символов")
		.max(35, "Имя не должно состоять из более чем 35 символов"),
	email: yup
		.string()
		.required("Электронная почта обязательна для заполнения")
		.email("Электронная почта введена некорректно"),
});
