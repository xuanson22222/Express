const express = require('express');
const router = express.Router();

const SinhVien = require('../models/sinhvienModel');  // Đường dẫn tới model của bạn

// Lấy toàn bộ danh sách sinh viên
router.get('/all', async (req, res) => {
    try {
        const danhSach = await SinhVien.find();
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Lấy toàn bộ danh sách sinh viên thuộc khoa CNTT
router.get('/sinhvien/cntt', async (req, res) => {
    try {
        const danhSach = await SinhVien.find({ boMon: 'CNTT' });
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.5
router.get('/sinhvien/diemTB', async (req, res) => {
    try {
        const danhSach = await SinhVien.find({ diemTB: { $gte: 6.5, $lte: 8.5 } });
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Tìm kiếm thông tin của sinh viên theo MSSV
router.get('/sinhvien/:mssv', async (req, res) => {
    try {
        const sinhVien = await SinhVien.findOne({ MSSV: req.params.mssv });
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Thêm mới một sinh viên
router.post('/sinhvien', async (req, res) => {
    try {
        const sinhVienMoi = new SinhVien(req.body);
        await sinhVienMoi.save();
        res.status(200).json({ status: true, message: "Thêm sinh viên thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Thay đổi thông tin sinh viên theo MSSV
router.put('/sinhvien/:mssv', async (req, res) => {
    try {
        await SinhVien.updateOne({ MSSV: req.params.mssv }, req.body);
        res.status(200).json({ status: true, message: "Cập nhật thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Xóa một sinh viên ra khỏi danh sách
router.delete('/sinhvien/:mssv', async (req, res) => {
    try {
        await SinhVien.deleteOne({ MSSV: req.params.mssv });
        res.status(200).json({ status: true, message: "Xóa thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Lấy danh sách các sinh viên thuộc BM CNTT và có điểm trung bình từ 9.0
router.get('/sinhvien/cntt/diemTB9', async(req, res) => {
    try {
        const danhSach = await SinhVien.find({ boMon: 'CNTT', diemTB: { $gte: 9.0 } });
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT có điểm trung bình từ 6.5
router.get('/sinhvien/cntt/tuoi18-20', async (req, res) => {
    try {
        const danhSach = await SinhVien.find({ boMon: 'CNTT', tuoi: { $gte: 18, $lte: 20 }, diemTB: { $gte: 6.5 } });
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Sắp xếp danh sách sinh viên tăng dần theo điểm trung bình
router.get('/sinhvien/sapxep/diemTB', async (req, res) => {
    try {
        const danhSach = await SinhVien.find().sort({ diemTB: 1 });
        res.status(200).json(danhSach);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
router.get('/sinhvien/cntt/diemTBcao', async (req, res) => {
    try {
        const sinhVien = await SinhVien.findOne({ boMon: 'CNTT' }).sort({ diemTB: -1 });
        res.status(200).json(sinhVien);
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

module.exports = router;
