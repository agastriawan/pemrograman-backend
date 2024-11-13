<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class,'login']);
Route::get('/employees', [PegawaiController::class, 'index'])->middleware('auth:sanctum');
Route::post('/employees', [PegawaiController::class, 'store']);
Route::put('/employees/{id}', [PegawaiController::class, 'update']);
Route::delete('/employees/{id}', [PegawaiController::class, 'destroy']);
Route::get('/employees/{id}', [PegawaiController::class, 'show']);
Route::get('/employees/search/{name}', [PegawaiController::class, 'search']);
Route::get('/employees/status/active', [PegawaiController::class, 'active']);
Route::get('/employees/status/inactive', [PegawaiController::class, 'inactive'])->middleware('auth:sanctum');;
Route::get('/employees/status/terminated', [PegawaiController::class, 'terminated']);