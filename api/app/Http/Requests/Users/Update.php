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
            'identification_number' => 'nullable|string|unique:users,identification_number|max:255|cpf',
            'password' => 'nullable|string|min:8|max:255',
            'birthday' => 'nullable|date',
            'address.cep' => 'nullable|string',
            "address.street" => 'nullable|string',
            "address.number" => 'nullable|numeric',
            "address.complement" => 'nullable|string',
            "address.neighborhood" => 'nullable|string',
            "address.city" => 'nullable|string',
            "address.state" => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            "cpf" => "The field identification number is not a valid CPF."
        ];
    }
}
