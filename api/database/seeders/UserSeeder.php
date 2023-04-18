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
        ])->each(function ($user) {
            Address::factory()->create([
                'user_id' => $user->id
            ]);
        });
    }
}
