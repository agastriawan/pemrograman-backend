<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Ambil semua data
    Route::get('/employees', [PegawaiController::class, 'index']);

    // Input Data
    Route::post('/employees', [PegawaiController::class, 'store']);

    // Edit Data
    Route::put('/employees/{id}', [PegawaiController::class, 'update']);

    // Hapus Data
    Route::delete('/employees/{id}', [PegawaiController::class, 'destroy']);

    // Detail Data
    Route::get('/employees/{id}', [PegawaiController::class, 'show']);

    // Search Data Berdasarkan Nama
    Route::get('/employees/search/{name}', [PegawaiController::class, 'search']);

    // Search Data Berdasarkan Status Active
    Route::get('/employees/status/active', [PegawaiController::class, 'active']);

    // Search Data Berdasarkan Status Inactive
    Route::get('/employees/status/inactive', [PegawaiController::class, 'inactive']);;

    // Search Data Berdasarkan Status Terminated
    Route::get('/employees/status/terminated', [PegawaiController::class, 'terminated']);
});
