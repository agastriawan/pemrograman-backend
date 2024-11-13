<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $table = 'pegawai';

    protected $fillable = ['name', 'gender', 'phone', 'address', 'email', 'status', 'hired_on'];

    public $timestamps = true;
}