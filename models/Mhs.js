const mongoose = require('mongoose');

const MhsSchema = mongoose.Schema({
    nim: {
        type: String,
        required: true
    },
    matkul:[]
});

module.exports = mongoose.model('Mhs', MhsSchema);