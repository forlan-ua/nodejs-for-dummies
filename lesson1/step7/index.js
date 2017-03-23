const Jasmine = require("jasmine");
const path = require("path");


var runner = new Jasmine();


runner.execute([
    path.join(__dirname, "spec", "01. true.js"),
    path.join(__dirname, "spec", "02. setup.js"),
    path.join(__dirname, "spec", "03. spy.js")
]);