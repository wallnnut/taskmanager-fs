export const authErrorGenerator = (message) => {
	switch (message) {
		case "EMAIL_EXISTS":
			return "Пользователь с данным Email уже существует";
		case "EMAIL_NOT_FOUND":
			return "Пользователя с данным Email не существует";
		case "INVALID_PASSWORD":
			return "Введен неверный пароль";
		default:
			break;
	}
};
