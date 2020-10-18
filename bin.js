const main = require('.');
const fs = require('fs');
const toml = require('toml-js');
const { exit } = require('process');

fs.readFile('config.toml', (err, data) => {
    if (err) {
        console.log(err);
    } else {
            const parsed = toml.parse(data);
            for (const key of ["destinationPath", "min", "max", "Ids"]) {
                if (parsed[key] === undefined) {
                   console.log(`No ${key} declared in the config file (could also be that you missspelled it in the config)`);
                   exit();
                }
            }
            console.log(parsed);
            main(parsed.destinationPath, parsed.min, parsed.max, parsed.Ids);
    }
});