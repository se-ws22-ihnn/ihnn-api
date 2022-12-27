const express = require('express');
const connectDb = require("./config/db");
const { questions } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "IHNN REST API",
			version: "1.0",
			description: "API für Fragen des IHNN Spiels",
			contact: "Soeren Helms, soeren.helms@haw-hamburg.de"
		},
	},
	apis: ["./routes/question.js"]
}

app.use('/questions', questions)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, HOST, () => {
    console.log(`Running on http://localhost:${PORT}`);
});