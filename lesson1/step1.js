const fs = require("fs");
const path = require("path");
const {getJson} = require("./getJson");


function main() {
    console.log("START MAIN");
    getJson("https://api.ipify.org?format=json", function(err, data) {
        if (err) throw err;
        console.log("STEP 1:", data);
        getJson(`https://freegeoip.net/json/${data.ip}`, function(err, data) {
            if (err) throw err;
            console.log("STEP 2:", data);
            fs.writeFile(path.join(__dirname, "geoip.json"), JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log("STEP3: WORKER DONE");
            })
        })
    });
    console.log("END MAIN");
}

if (!module.parent) {
    main();
}