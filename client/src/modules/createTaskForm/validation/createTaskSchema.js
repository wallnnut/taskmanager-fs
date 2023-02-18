import * as yup from "yup";

export const createTaskSchema = yup.object().shape({
	category_size: yup.string().required("Выбирите размер задачи"),
	category_sphere: yup.string().required("Выбирите сферу"),

	priority: yup.string().required("Выбирите приоритет задачи"),
	description: yup.string().required("Введите описание задачи"),
	title: yup.string().required("Введите название задачи"),
});
