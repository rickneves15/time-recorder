<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    // use HasApiTokens, HasFactory, Notifiable;
    use HasFactory, Notifiable;

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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
