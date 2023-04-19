<?php

namespace App\Services;

use App\Models\Roles;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersService
{
    public function __construct(private AddressService $addressService)
    {
    }
    public function fetchAll()
    {
        $users = User::with(['address', 'role', 'manager'])->orderBY('id')->get();
        return $users;
    }

    public function fetchOne(int $id)
    {
        $user = User::with(['address', 'role', 'manager'])->find($id);

        if (!$user) {
            return null;
        }

        return $user;
    }

    public function create(int $adminUserId, array $data)
    {
        $address = $data['address'] ?? [];
        unset($data['address']);

        $data['password'] = Hash::make($data['password']);
        $data['manager_id'] = $adminUserId;

        $user = User::create($data);
        if ($address) {
            $user->address()->create($address);
        }

        return $this->fetchOne($user['id']);
    }

    public function update(int $id, array $data, int $adminUserId)
    {
        $user = $this->fetchOne($id);

        if (!$user) {
            $user = $this->create($adminUserId, $data);
        }

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
