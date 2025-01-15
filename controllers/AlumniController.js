// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {
  async index(req, res) {
    const alumni = await Alumni.all();

    // Pengecekan jika data kosong
    if (!alumni || alumni.length === 0) {
      return res.status(404).json({
        message: "Data is empty",
        status: 200,
      });
    }

    // Jika data berhasil di ambil
    const data = {
      message: "Get All Resource",
      data: alumni,
      status: 200,
    };

    res.json(data);
  }

  async store(req, res) {
    const {
      name,
      phone,
      address,
      graduation_year,
      status,
      company_name,
      position,
    } = req.body;

    // Validasi field wajib diisi
    if (
      !name ||
      !phone ||
      !address ||
      !graduation_year ||
      !status ||
      !company_name ||
      !position
    ) {
      return res.status(422).json({
        message: "All fields must be filled correctly",
        status: 422,
      });
    }

    console.log(name);
    

    // Proses penyimpanan data
    const newAlumni = await Alumni.create({
      name,
      phone,
      address,
      graduation_year,
      status,
      company_name,
      position,
    });

    // Respons jika data sukses
    return res.status(201).json({
      message: "Resource is added successfully",
      data: newAlumni,
      status: 201,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Perbarui data alumni
    const updatedAlumni = await Alumni.update(id, req.body);

    // Respons jika pembaruan berhasil
    return res.status(200).json({
      message: "Resource is update successfully",
      data: updatedAlumni,
      status: 200,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Hapus data alumni
    await Alumni.delete(id);

    // Respons jika penghapusan berhasil
    return res.status(200).json({
      message: "Resource is delete successfully",
      status: 200,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Respons jika data alumni ditemukan
    return res.status(200).json({
      message: "Get Detail Resource",
      data: alumni,
      status: 200,
    });
  }

  async search(req, res) {
    const { name } = req.params;

    // Cari data alumni berdasarkan nama
    const alumni = await Alumni.search(name);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Respons jika data alumni ditemukan
    return res.status(200).json({
      message: "Get Searched Resource",
      data: alumni,
      status: 200,
    });
  }

  async freshGraduate(req, res) {
    const status = "fresh-graduate";

    // Cari data alumni berdasarkan status
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Menghitung total alumni yang fresh graduate
    const totalAlumni = await Alumni.countByStatus(status);

    // Respons jika data alumni ditemukan
    return res.status(200).json({
      message: "Get Fresh Graduate Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  async employed(req, res) {
    const status = "employed";

    // Cari data alumni berdasarkan status
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Menghitung total alumni yang employed/sudah bekerja
    const totalAlumni = await Alumni.countByStatus(status);

    // Respons jika data alumni ditemukan
    return res.status(200).json({
      message: "Get Employed Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  async unemployed(req, res) {
    const status = "unemployed";

    // Cari data alumni berdasarkan status
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Respons jika data alumni tidak ditemukan
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    // Menghitung total alumni yang unemployed/sudah bekerja
    const totalAlumni = await Alumni.countByStatus(status);

    // Respons jika data alumni ditemukan
    return res.status(200).json({
      message: "Get Unemployed Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
