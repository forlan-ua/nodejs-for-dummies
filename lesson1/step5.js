const fs = require("./asyncfs");
const path = require("path");
const {getJsonAsync: getJson} = require("./getJson");


async function main() {
    console.log("START MAIN");
    var data1 = await getJson("https://api.ipify.org?format=json");
    console.log("STEP 1:", data1);
    var data2 = await getJson(`https://freegeoip.net/json/${data1.ip}`);
    console.log("STEP 2:", data2);
    await fs.writeFile(path.join(__dirname, "geoip.json"), JSON.stringify(data2));
    console.log("STEP3: WORKER DONE");
    console.log("END MAIN");
}


if (!module.parent) {
    main();
}