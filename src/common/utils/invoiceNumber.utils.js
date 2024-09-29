const moment = require("moment-jalali")

function generateInvoiceNumber() {
    return moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9);
}
module.exports = {
    generateInvoiceNumber
}