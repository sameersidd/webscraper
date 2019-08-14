const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.json({
		Description: "WebScraper API to scrape a webpage and send in JSON format",
		Message: "Hello"
	});
});

app.use("/page", require("./routes/webpage"));

app.listen(PORT, () => {
	console.log("Server started at Port: " + PORT);
});
