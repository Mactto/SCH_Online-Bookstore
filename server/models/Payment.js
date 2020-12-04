const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: [],
    },
    data: {
        type: Array,
        default: [],
    },
    product: {
        type: Array,
        default: [],
    },
    ack: {
        type: Boolean,
        default: false,
    }
})


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }