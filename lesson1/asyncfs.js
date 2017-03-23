var fs = require("fs");


Object.keys(fs).forEach((key) => {
    var name = (/(\S+)Sync$/.exec(key) || [])[1];
    if (!name) return;
    exports[name] = function(...args) {
        return new Promise((res, rej) => {
            args.push((err, data) => {
                if (err) return rej(err);
                res(data)
            });
            fs[name].apply(fs, args);
        })
    }
});