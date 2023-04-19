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
            'identification_number' => 'required|string|max:255|cpf',
            'password' => 'required|string|min:8|max:255',
            'birthday' => 'required|date',
            'address.cep' => 'required|string',
            "address.street" => 'required|string',
            "address.number" => 'nullable|numeric',
            "address.complement" => 'nullable|string',
            "address.neighborhood" => 'required|string',
            "address.city" => 'required|string',
            "address.state" => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            "cpf" => "The field identification number is not a valid CPF."
        ];
    }
}
