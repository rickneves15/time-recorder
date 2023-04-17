<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|unique:users,email|max:255',
            'identification_number' => 'nullable|string|unique:users,identification_number|max:255',
            'birthday' => 'nullable|date',
            'cep' => 'nullable|string',
        ];
    }
}
