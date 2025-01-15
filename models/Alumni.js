// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {

  // Mengambil semua data alumni
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from alumni";
      db.query(sql, (err, results) => {
        resolve(results); // Mengembalikan hasil query
      });
    });
  }

  // Menambahkan data alumni baru
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        resolve(results.insertId); // Mengembalikan ID alumni yang baru ditambahkan
      });
    });
    const alumni = await this.find(id); // Mengambil data alumni berdasarkan ID
    return alumni; // Mengembalikan data alumni yang baru
  }

  // Memperbarui data alumni berdasarkan ID
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        resolve(results); // Mengembalikan hasil query
      });
    });
    const alumni = await this.find(id); // Mengambil data alumni setelah update
    return alumni; // Mengembalikan data alumni yang sudah diperbarui
  }

  // Menghapus data alumni berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        resolve(results); // Mengembalikan hasil query
      });
    });
  }

  // Mencari alumni berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        const [alumni] = results; // Mengambil data alumni pertama dari hasil query
        resolve(alumni); // Mengembalikan data alumni
      });
    });
  }

  // Mencari alumni berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        const [alumni] = results; // Mengambil data alumni pertama dari hasil query
        resolve(alumni); // Mengembalikan data alumni
      });
    });
  }

  // Mencari alumni berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status LIKE ?";
      db.query(sql, [`%${status}%`], (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        resolve(results); // Mengembalikan hasil query
      });
    });
  }

  // Menghitung jumlah alumni berdasarkan status
  static countByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) AS total FROM alumni WHERE status LIKE ?";
      db.query(sql, [`%${status}%`], (err, results) => {
        if (err) reject(err); // Menangani error jika ada
        resolve(results[0].total); // Mengembalikan jumlah total alumni dengan status tertentu
      });
    });
  }
   
}

// export class Alumni
module.exports = Alumni;
