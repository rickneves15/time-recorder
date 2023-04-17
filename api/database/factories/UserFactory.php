<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'identification_number' => fake()->cpf(false),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
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
