<?php

namespace App\Http\Requests\RecordPoints;

use Illuminate\Foundation\Http\FormRequest;

class Filters extends FormRequest
{
    public function rules()
    {
        return [
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ];
    }
}
