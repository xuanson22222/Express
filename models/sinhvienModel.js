const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sinhVien = new Schema({
    id: {type: ObjectId},
    Masv: {type: String},
    Hoten: {type: String},
    DiemTb: {type: Number},
    Mon: {type: String},
    Tuoi: {type: Number}
});

module.exports = mongoose.models.sinhVien || mongoose.model('sinhVien', sinhVien);