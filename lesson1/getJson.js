const https = require("https");
const http = require("http");


exports.getJson = function(url, callback) {
    if (/^https/.test(url)) {
        var method = https.get;
    } else {
        var method = http.get;
    }

    method(url, (res) => {
        if (res.statusCode !== 200) {
            res.resume();
            return callback(new Error(`Only 200 status code is allowed. Got ${res.statusCode}`))
        }
        if (!/^application\/json/.test(res.headers["content-type"])) {
            res.resume();
            return callback(new Error(`Only application/json content type is allowed. Got ${res.headers["content-type"]}`))
        }

        var data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            try {
                callback(null, JSON.parse(data));
            } catch (e) {
                callback(e)
            }
        })
    })
    .on("error", (e) => callback(e))
};


exports.getJsonAsync = function(url) {
    return new Promise((res, rej) => {
        exports.getJson(url, (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    })
};