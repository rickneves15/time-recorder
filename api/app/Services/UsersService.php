<?php

namespace App\Services;

use App\Models\User;

class UsersService
{
    public function fetchAll()
    {
        $users = User::all();
        return $users;
    }

    public function fetchOne(int $id)
    {
        $user = User::query()->find($id);

        if (!$user) {
            return null;
        }

        return $user;
    }

    public function create(array $data)
    {
        $user = User::create($data);


        return $this->fetchOne($user['id']);
    }

    public function update(int $id, array $data)
    {
        $user = $this->fetchOne($id);

        if (!$user) {
            $user = $this->create($data);
        }

        $user->update($data);


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
