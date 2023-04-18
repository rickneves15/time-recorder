<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'identification_number',
        'password',
        'birthday',
        'role_id',
        'manager_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function recordPoints()
    {
        return $this->hasMany(RecordPoint::class);
    }

    public function role()
    {
        return $this->belongsTo(Roles::class);
    }
}
