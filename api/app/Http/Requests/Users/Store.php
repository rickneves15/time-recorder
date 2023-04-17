<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class Store extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email|max:255',
            'identification_number' => 'required|string|unique:users,identification_number|max:255',
            'password' => 'required|string|min:8|max:255',
            'birthday' => 'required|date',
        ];
    }
}
