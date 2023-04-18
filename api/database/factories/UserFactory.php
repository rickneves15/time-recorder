<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => "ricknevesbc@hotmail.com",
            'identification_number' => fake()->cpf(false),
            'password' => Hash::make("123456789"),
            'birthday' => fake()->date('Y-m-d'),
        ];
    }

    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'remember_token' => null,
        ]);
    }
}
