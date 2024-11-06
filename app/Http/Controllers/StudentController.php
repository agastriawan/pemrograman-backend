<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;


class StudentController extends Controller
{
    public function index(){
        $student = Student::all();

        if ($student->isEmpty()) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
                'data' => []
            ], 404);
        }    

        $data = [
            'message' => ' Berhasil akses data',
            'data' => $student
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request) {
        $input = [
            'nama' => $request->nama ? $request->nama : null,
            'nim' => $request->nim ? $request->nim : null,
            'email' => $request->email ? $request->email : null,
            'jurusan' => $request->jurusan ? $request->jurusan : null,
        ];

        $student = Student::create($input);
        $data = [
            'message' => 'Data berhasil ditambah',
            'data' => $student
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $student = Student::find($id);
    
        if (!$student) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
        ];
    
        $student->update($input);
    
        $data = [
            'message' => 'Data berhasil diupdate',
            'data' => $student
        ];
    
        return response()->json($data, 200);
    }
    
    public function destroy($id) {
        $student = Student::find($id);
    
        if (!$student) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    
        $student->delete();
    
        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
    
}
