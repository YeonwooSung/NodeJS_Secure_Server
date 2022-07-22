const fs = require('fs');

function createWhitelistIfNotExists(whitelist_filepath) {
    let exists = fs.existsSync(whitelist_filepath);
    if (!exists) fs.writeFileSync(whitelist_filepath, '');
    return exists;
}


module.exports = {
    createWhitelistIfNotExists
}