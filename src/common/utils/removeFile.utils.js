const fs = require('fs');
const path = require('path');
function removeFile(fileAddress) {
    if (Array.isArray(fileAddress)) {
        fileAddress.map(address => {
            const file = path.join("public", address)
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }
        })
    } else if (fileAddress) {
        const file = path.join("public", fileAddress)
        if (fs.existsSync(file)) {
            console.log("Unlink");
            fs.unlinkSync(file)
        }

    }
}
module.exports = { removeFile }