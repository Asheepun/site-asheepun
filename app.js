const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const mimeTypes = {
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".json": "text/json",
	".png": "image/png",
	".jpg": "image/jpg",
	".gif": "image/gif",
	".wav": "audio/wav",
};

const requestHandler = (req, res) => {

	if(req.method === "GET"){

		console.log(req.url)

		let filePath;

		if(req.url === "/"){
			filePath = "./view/index.html";
		}else if(req.url === "/old_projects"){
			filePath = "./view/old_projects.html";
		}else if(req.url === "/non_game_projects"){
			//console.log("CHECK");
			filePath = "./view/non_game_projects.html";
		}else{
			filePath = "./public" + req.url;
		}

		const extName = String(path.extname(filePath)).toLowerCase();

		const contentType = mimeTypes[extName] || "application/octet-stream";

		fs.readFile(filePath, (err, data) => {
			if(err){
				res.writeHead(200, {
					"Content-Type": "text/plain",
				});

				res.end("Could not find file: " + req.url, "utf-8");
			}else{

				res.writeHead(200, {
					"Content-Type": contentType,
				});

				res.end(data, "utf-8");
			
			}
		});

	}
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if(err) throw err;
	console.log("Listening on port: " + port);
});
