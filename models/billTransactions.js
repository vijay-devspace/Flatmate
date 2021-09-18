const mongoose = require('mongoose');
const billTransactionsSchema = new mongoose.Schema({
    billId: {
        type: String,
        required: false,
    },
    creditedBy: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true,
    },
    debit: {
        type: Number,
        required: false,
    },
    creditedTo: {
        type: String,
        required: true,
    },
    created_on: {
        type: Date,
        default: new Date(),
    },
});
//Database Name:Flatmate   Collection Name: BillTransactions
var billTransactionsdata = mongoose.model('BillTransactions', billTransactionsSchema);
module.exports = billTransactionsdata;