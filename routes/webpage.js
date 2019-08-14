const router = require("express").Router();
const cheerio = require("cheerio");
const request = require("request");

router.get("/:site", (req, res) => {
	const RequestedURL = "https://" + req.params.site;
	console.log("Requested URL: ", RequestedURL);
	request(RequestedURL, (err, response, html) => {
		if (!err && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const JSONResponse = {};
			// console.log($("body"));
			$("body")
				.children()
				.each((i, el) => {
					if (el.tagName !== "script")
						JSONResponse[`${el.tagName}`] = el.attribs;
				});
			res.json({
				Url: RequestedURL,
				Response: JSONResponse
			});
		} else {
			res
				.json({
					URL: `https://${RequestedURL}`,
					Message: "Error: " + err.json
				})
				.status(400);
		}
	});
	// res
	// 	.json({
	// 		Message: "Receieved"
	// 	})
	// 	.status(200);
});

router.post("/", (req, res) => {
	const RequestedURL = "https://" + req.body.url;
	let body = req.body.get;
	if (body == null || undefined) body = ["body"];
	const JSONResponse = {};
	console.log("RequestedURL: ", RequestedURL);
	console.log("Method", req.method);
	request(RequestedURL, (err, response, html) => {
		if (!err && response.statusCode == 200) {
			const $ = cheerio.load(html);
			body.forEach((val, i) => {
				if (typeof val == "string") {
					JSONResponse[val] = {};
					$(val)
						.children()
						.each((i, el) => {
							if (el.tagName !== "script")
								JSONResponse[val][`${el.tagName}`] = el.attribs;
						});
				}
			});
		}
		res.json(JSONResponse);
	});
	// res
	// 	.json({
	// 		Message: "Receieved"
	// 	})
	// 	.status(200);
});

module.exports = router;
