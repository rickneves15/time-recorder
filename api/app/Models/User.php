<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
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

    protected $casts = [
        'birthday' => 'date:d/m/Y',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function recordPoints()
    {
        return $this->hasMany(RecordPoint::class);
    }

    public function manager()
    {
        return $this->hasOne(User::class, "id", "manager_id");
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
