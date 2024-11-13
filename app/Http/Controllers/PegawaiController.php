<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PegawaiController extends Controller
{
    public function index()
    {
        // Mengambil semua data pada table database employees
        $pegawai = Pegawai::all();

        // Pengecekan jika data kosong atau tidak ditemukan
        if ($pegawai->isEmpty()) {
            return response()->json([
                'message' => 'Data is empty',
                'data' => []
            ], 200);
        }

        // Menyiapkan Data Response
        $data = [
            'message' => ' Get All Resource',
            'data' => $pegawai
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        // Membuat Validasi untuk inputan setiap fields
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'phone' => 'required|string|max:15',
            'address' => 'required|string',
            'email' => 'required|email|unique:pegawai,email',
            'status' => 'required|string',
            'hired_on' => 'required|date',
        ]);

        // Pengecekan jika terjadi kesalahan/error pada validasi
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Menambahkan Pegawai Baru
        $pegawai = Pegawai::create($request->all());

        // Menyiapkan Data Response
        $data = [
            'message' => 'Resource is added successfully',
            'data' => $pegawai
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 201);
    }

    public function show($id)
    {
        // Mencari data pegawai berdasarkan id
        $pegawai = Pegawai::find($id);

        // Pengecekan jika data tidak ditemukan
        if (!$pegawai) {
            return response()->json([
                'message' => 'Resource Not Found',
            ], 404);
        }

        // Menyiapkan Data Response
        $data = [
            'message' => 'Get Detail Resource',
            'data' => $pegawai
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        // Mencari data pegawai berdasarkan ID
        $pegawai = Pegawai::find($id);

        // Pengecekan jika data tidak ditemukan
        if (!$pegawai) {
            return response()->json([
                'message' => 'Resource Not Found',
            ], 404);
        }

        // Mengupdate data pegawai
        $pegawai->update($pegawai);

        // Menyiapkan Data Response
        $data = [
            'message' => 'Resource is update successfully',
            'data' => $pegawai
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        // Mencari data pegawai berdasarkan Id
        $pegawai = Pegawai::find($id);

        // Pengecekan jika data tidak ditemukan
        if (!$pegawai) {
            return response()->json(['message' => 'Resource Not Found'], 404);
        }

        // Hapus pegawai berdasarkan id yang dikirim
        $pegawai->delete();

        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }

    public function search($name)
    {
        // Mencari pegawai berdasarkan parameter name
        $pegawai = Pegawai::where('name', 'like', '%' . $name . '%')->get();

        // Pengecekan jika data tidak ditemukan
        if ($pegawai->isEmpty()) {
            return response()->json([
                'message' => 'Resource Not Found',
                'data' => []
            ], 404);
        }

        // Menyiapkan Data Response
        $data = [
            'message' => 'Get searched resource',
            'data' => $pegawai
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function active()
    {
        // Mencari pegawai yang status nya active
        $pegawai = Pegawai::where('status', 'active')->get();

        // Menghitung total pegawai dengan status active
        $totalActive = $pegawai->count();

        // Menyiapkan Data Response
        $data = [
            'message' => 'Get Active Resource',
            'data' => $pegawai,
            'total' => $totalActive
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function inactive()
    {
        // Mencari pegawai yang status nya inactive
        $pegawai = Pegawai::where('status', 'inactive')->get();

        // Menghitung total pegawai dengan status inactive
        $totalInactive = $pegawai->count();

        // Menyiapkan Data Response
        $data = [
            'message' => 'Get Inactive Resource',
            'data' => $pegawai,
            'total' => $totalInactive
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }

    public function terminated()
    {
        // Mencari pegawai yang status nya terminated
        $pegawai = Pegawai::where('status', 'terminated')->get();

        // Menghitung total pegawai dengan status terminated
        $totalTerminated = $pegawai->count();

        // Menyiapkan Data Response
        $data = [
            'message' => 'Get Terminated Resource',
            'data' => $pegawai,
            'total' => $totalTerminated
        ];

        // Mengembalikan response dalam format JSON
        return response()->json($data, 200);
    }
}
