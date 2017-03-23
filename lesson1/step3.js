const fs = require("./asyncfs");
const path = require("path");
const {getJsonAsync: getJson} = require("./getJson");


function main() {
    console.log("START MAIN");
    Promise.resolve()
        .then(() => getJson("https://api.ipify.org?format=json"))
        .then((data) => {
            console.log("STEP 1:", data);
            return getJson(`https://freegeoip.net/json/${data.ip}`);
        })
        .then((data) => {
            console.log("STEP 2:", data);
            return fs.writeFile(path.join(__dirname, "geoip.json"), JSON.stringify(data));
        })
        .then((data) => {
            console.log("STEP3: WORKER DONE");
        })
        .catch((err) => {
            console.log(err);
        });
    console.log("END MAIN");
}


if (!module.parent) {
    main();
}
