// import Model Student
const Student = require("../models/Student");

class StudentController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const students = await Student.all();

    const data = {
      message: "Menampilkkan semua students",
      data: students,
    };

    res.json(data);
  }

  async store(req, res) {
    /**
     * TODO 2: memanggil method create.
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     */

    // TAMBAHAN : Saya menambahkan Validasi Inputan Ketika ada data yang tidak diisi dan saya juga membuat try catch apabila terjadi error

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

  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    const data = {
      message: `Mengedit student id ${id}, nama ${nama}`,
      data: [],
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    const data = {
      message: `Menghapus student id ${id}`,
      data: [],
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
