<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    protected $animals;

    public function __construct()
    {
        $this->animals = ['Kucing', 'Anjing', 'Ayam'];
    }

    public function index()
    {
        foreach ($this->animals as $index => $animal) {
            echo ($index + 1) . ". " . $animal . "<br>";
        }
    }

    public function store(Request $request)
    {
        echo "List Hewan Sebelum di Tambah : <br>";
        echo $this->index();

        array_push($this->animals, $request->nama_hewan);
        echo "<br> List Hewan Setelah di Tambah : <br> ";
        echo $this->index();

        echo "<br> Hewan baru '$request->nama_hewan' telah ditambahkan.<br>";
    }

    public function update(Request $request, $id)
    {
        echo "List Hewan Sebelum di Update : <br>";
        echo $this->index();

        $oldAnimal = $this->animals[$id];
        $this->animals[$id] = $request->nama_hewan;

        echo "<br> List Hewan Setelah di Update : <br> ";
        echo $this->index();

        echo "<br> Hewan '$oldAnimal' telah diupdate menjadi ' $request->nama_hewan'.<br>";
    }

    public function destroy($id)
    {
        echo "List Hewan Sebelum di Hapus : <br>";
        echo $this->index();

        $deletedAnimal = $this->animals[$id];
        unset($this->animals[$id]);

        echo "<br> List Hewan Setelah di Hapus : <br> ";
        echo $this->index();

        echo "<br> Hewan '$deletedAnimal' telah dihapus.<br>";
    }
}
