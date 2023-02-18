const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes/index");
const cors = require('cors');
const path = require('path');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

if(process.env.NODE_ENV === "production") {
	app.use('/', express.static(path.join(__dirname, "client")))

	const indexPath = path.join(__dirname, "client", "index.html")

	app.get('*', (req, res) => {
		res.sendFile(indexPath)
	})
}

async function start() {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connection.once("open", () => {
			initDatabase();
		});

		await mongoose.connect(config.get("mongoUri"));
		app.listen(PORT, () => {
			console.log(chalk.green(`Server has been started on port ${PORT}`));
		});
	} catch (error) {
		console.log(chalk.red(error.message));
		process.exit(1);
	}
}

start();
