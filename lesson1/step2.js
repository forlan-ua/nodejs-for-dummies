const fs = require("fs");
const path = require("path");
const {getJson} = require("./getJson");


var queue = [];
queue.workInProgress = false;
queue.value = null;
queue.add = function(callback) {
    this.push(callback);
    if (!this.workInProgress) {
        queue.next(this.value);
    }
};
queue.next = function(data) {
    this.value = data;
    var callback = this.shift();
    if (!callback) {
        queue.workInProgress = false;
        return;
    }
    queue.workInProgress = true;
    callback(data);
};


function main() {
    console.log("START MAIN");
    queue.add(function() {
        getJson("https://api.ipify.org?format=json", function(err, data) {
            if (err) throw err;
            console.log("STEP 1:", data);
            queue.next(data);
        })
    });
    queue.add(function(data) {
        getJson(`https://freegeoip.net/json/${data.ip}`, function(err, data) {
            if (err) throw err;
            console.log("STEP 2:", data);
            queue.next(data);
        })
    });
    queue.add(function(data) {
        fs.writeFile(path.join(__dirname, "geoip.json"), JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log("STEP3: WORKER DONE");
            queue.next()
        })
    });
    console.log("END MAIN");
}


if (!module.parent) {
    main();
}