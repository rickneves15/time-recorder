<?php

namespace App\Http\Requests\RecordPoints;

use Illuminate\Foundation\Http\FormRequest;

class Store extends FormRequest
{
    public function rules()
    {
        return [
            'type' => 'required|in:checkout,checkin',
        ];
    }
}
