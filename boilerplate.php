<?php

# Membuat class Animal
class Animal
{
    # Property animals (array)
    private $animals;

    # Method constructor - mengisi data awal
    # Parameter: data hewan (array)
    public function __construct($data)
    {
        $this->animals = $data;
    }

    # Method index - menampilkan data animals
    public function index()
    {
        foreach ($this->animals as $index => $animal) {
            echo ($index + 1) . ". " . $animal . "<br>";
        }
    }

    # Method store - menambahkan hewan baru
    # Parameter: hewan baru
    public function store($data)
    {
        array_push($this->animals, $data);
        echo "Hewan baru '$data' telah ditambahkan.<br>";
    }

    # Method update - mengupdate hewan
    # Parameter: index dan hewan baru
    public function update($index, $data)
    {
        $oldAnimal = $this->animals[$index];
        $this->animals[$index] = $data;
        echo "Hewan '$oldAnimal' telah diupdate menjadi '$data'.<br>";
    }

    # Method destroy - menghapus hewan
    # Parameter: index
    public function destroy($index)
    {
        $deletedAnimal = $this->animals[$index];
        unset($this->animals[$index]);
        
        $this->animals = array_values($this->animals);
        echo "Hewan '$deletedAnimal' telah dihapus.<br>";
    }
}

# Membuat object
$animal = new Animal(['Kucing', 'Anjing', 'Ayam']);

echo "Index - Menampilkan seluruh hewan <br>";
$animal->index();
echo "<br>";

echo "Store - Menambahkan hewan baru <br>";
$animal->store('Burung');
$animal->index();
echo "<br>";

echo "Update - Mengupdate hewan <br>";
$animal->update(0, 'Kucing Anggora');
$animal->index();
echo "<br>";

echo "Destroy - Menghapus hewan <br>";
$animal->destroy(1);
$animal->index();
echo "<br>";
