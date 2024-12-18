/**
 * Fungsi untuk menampilkan hasil download
 * @param {string} result - Nama file yang didownload
 */
const showDownload = (result) => {
  console.log("Download selesai");
  console.log(`Hasil Download: ${result}`);
};

/*Fungsi untuk download file menggunakan Promise*/
const download = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = "windows-10.exe";
      resolve(result);
    }, 3000);
  });
};

/**
 * Fungsi utama untuk menjalankan proses download
 * menggunakan Async/Await
 */
const main = async () => {
  try {
    const result = await download();
    showDownload(result);
  } catch (error) {
    console.error("Terjadi kesalahan saat mendownload file:", error);
  }
};

main();

/**
 * TODO:
 * - Refactor callback ke Promise atau Async Await
 * - Refactor function ke ES6 Arrow Function
 * - Refactor string ke ES6 Template Literals
 */
