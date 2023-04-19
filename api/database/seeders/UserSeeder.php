<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = new Roles();
        $adminRole->name = 'admin';
        $adminRole->save();

        $employeeRole = new Roles();
        $employeeRole->name = 'employee';
        $employeeRole->save();

        User::factory()->create([
            'role_id' => $adminRole->id
        ])->each(function ($user) use ($employeeRole) {
            Address::factory()->create([
                'user_id' => $user->id
            ]);
            User::factory()->create([
                'email' => "ricknevesbc2@hotmail.com",
                'role_id' => $employeeRole->id,
                'manager_id' => $user->id
            ])->each(function ($user2) {
                Address::factory()->create([
                    'user_id' => $user2->id
                ]);
            });
        });
    }
}
