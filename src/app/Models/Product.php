<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_path',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'integer',
    ];
}
