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
        type: Number,
        default: 0,
        maxlength: 2
    }
})


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }