<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersService
{
    public function __construct(private AddressService $addressService)
    {
    }
    public function fetchAll()
    {
        $users = User::with('address')->get();
        return $users;
    }

    public function fetchOne(int $id)
    {
        $user = User::with('address')->find($id);

        if (!$user) {
            return null;
        }

        return $user;
    }

    public function create(array $data)
    {
        $address = $data['address'] ?? [];
        unset($data['address']);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        if ($address) {

            $user->address()->create($address);
        }

        return $this->fetchOne($user['id']);
    }

    public function update(int $id, array $data)
    {
        $user = $this->fetchOne($id);

        if (!$user) {
            $user = $this->create($data);
        }

        $user['password'] = Hash::make($data['password']);

        $user->update($data);

        $user->address()->update($data['address'] ?? []);

        return $this->fetchOne($id);
    }

    public function delete(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return null;
        }

        User::destroy($id);

        return true;
    }
}
