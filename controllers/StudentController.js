// import Model Student
const Student = require("../models/Student");

class StudentController {
  // menambahkan keyword async
  async index(req, res) {
    const students = await Student.all();
  
    if (!students || students.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data student yang ditemukan",
        data: [],
      });
    }
  
    const data = {
      message: "Menampilkan semua students",
      data: students,
    };
  
    res.json(data);
  }

  async store(req, res) {
    const { nama, nim, email, jurusan } = req.body;

    try {
      if (!nama || !nim || !email || !jurusan) {
        throw new Error("Semua field wajib diisi!");
      }

      const newStudent = await Student.create({
        nama,
        nim,
        email,
        jurusan,
      });

      const data = {
        message: "Menambahkan data student",
        data: newStudent,
      };

      res.json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await Student.find(id);
    if (student) {
      const student = await Student.update(id, req.body);

      const data = {
        message: "Mengedit data students",
        data: student,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Student not found",
      };

      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const student = await Student.find(id);
    
    if (student) {
      await Student.delete(id);
      const data = { message: `Menghapus data students` };
      res.status(200).json(data);
    } else {
      const data = { message: `Student not found` };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.find(id);

    if (student) {
      const data = { message: `Menampilkan detail students`, data: student };
      res.status(200).json(data);
    } else {
      const data = { message: `Student not found` };
      res.status(404).json(data);
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
