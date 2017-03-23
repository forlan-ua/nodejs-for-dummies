const fs = require("./asyncfs");
const path = require("path");
const {getJsonAsync: getJson} = require("./getJson");


function runner(generator) {
    var value = null;

    (function next() {
        var item = generator.next(value);
        if (item.done) {
            return;
        }
        item.value
            .then((data) => {
                value = data;
                next();
            })
            .catch((err) => generator.throw(err))
    })();
}


function* main() {
    console.log("START MAIN");
    var data1 = yield getJson("https://api.ipify.org?format=json");
    console.log("STEP 1:", data1);
    var data2 = yield getJson(`https://freegeoip.net/json/${data1.ip}`);
    console.log("STEP 2:", data2);
    yield fs.writeFile(path.join(__dirname, "geoip.json"), JSON.stringify(data2));
    console.log("STEP3: WORKER DONE");
    console.log("END MAIN");
}


if (!module.parent) {
    runner(main());
}