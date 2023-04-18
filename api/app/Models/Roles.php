<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    use HasFactory;

    public const ROLES = [
        'ADMIN' => 1,
        'EMPLOYEE' => 2
    ];

    protected $fillable = [
        'name',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
