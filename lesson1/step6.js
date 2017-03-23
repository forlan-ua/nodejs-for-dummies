const http = require("http");
const PORT = 9092;


const server = http.createServer(function(req, res) {
    res.end("Hello World!");
});


server.listen(PORT, function() {
    console.log(`LISTEN ${PORT}`);
});