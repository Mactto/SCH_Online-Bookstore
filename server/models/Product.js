const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    discription: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    inventory: {
        type: Number,
        default: 100
    }
}, {timestamps:true})

productSchema.index({
    title:'text',
    discription:'text'
}, {
    weights: {
        title: 5,
        discription: 1
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }