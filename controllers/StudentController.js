const students = require("../data/students");

class StudentController {
  // Menampilkan data students
  index(req, res) {
    const data = {
      message: "Menampilkan data student",
      data: students,
    };

    res.json(data);
  }

  // Menambahkan data student baru
  store(req, res) {
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student tidak boleh kosong",
      });
    }

    const newStudent = {
      id: students.length + 1, // ID unik
      nama,
    };

    students.push(newStudent); // Tambahkan ke array

    const data = {
      message: `Menambahkan data student ${nama}`,
      data: newStudent,
    };

    res.json(data);
  }

  // Menghapus data student berdasarkan ID
  destroy(req, res) {
    const { id } = req.params; // Ambil id dari parameter URL
    const index = parseInt(id) - 1; // Index dimulai dari 0, jadi kurangi 1
    const deletedStudent = students.splice(index, 1); // Hapus elemen berdasarkan index
  
    const data = {
      message: `Menghapus data student dengan ID ${id}, dengan nama ${deletedStudent}`,
      data: students,
    };
  
    res.json(data);
  }
  

  // Memperbarui data student berdasarkan ID
  update(req, res) {
    const { id } = req.params; // Ambil id dari parameter URL
    const { nama } = req.body; // Ambil nama dari body request
  
    const index = parseInt(id) - 1; // Konversi id ke indeks array (kurangi 1 karena indeks dimulai dari 0)
    
    // Update nama student
    const oldName = students[index]; // Simpan nama lama (opsional)
    students[index] = nama; // Update data
  
    const data = {
      message: `Memperbarui data student dengan ID ${id}, dari nama ${oldName} menjadi ${nama}`,
      data: { id: id, nama: nama },
    };
  
    res.json(data);
  }
  
}

const studentController = new StudentController();
module.exports = studentController;