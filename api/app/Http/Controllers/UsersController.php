<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\Users\ChangePassword;
use App\Http\Requests\Users\Store;
use App\Http\Requests\Users\Update;
use App\Models\User;
use App\Services\UsersService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    use ResponseTrait;

    public function __construct(private UsersService $usersService)
    {
    }

    public function index()
    {
        try {
            $users = $this->usersService->fetchAll();
            return $this->responseSuccess($users, 'Users List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Store $request)
    {
        try {
            $validation = $request->validated();

            $user = $this->usersService->create($request->all());
            return $this->responseSuccess($user, 'New User Created Successfully !', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(int $id)
    {
        try {
            $user = $this->usersService->fetchOne($id);
            if (is_null($user)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($user, 'User Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Update $request, int $id)
    {
        try {
            $validation = $request->validated();

            $user = $this->usersService->update($id, $request->all());
            if (is_null($user)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($user, 'User Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $user = $this->usersService->delete($id);
            if (is_null($user)) {
                return $this->responseError(null, 'User Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($user, 'User Deleted Successfully !', Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function changePassword(ChangePassword $request)
    {
        try {
            $validation = $request->validated();

            $user = Auth::user();

            if (is_null($user)) {
                return $this->responseError(null, 'UNAUTHORIZED', Response::HTTP_UNAUTHORIZED);
            }

            if (!Hash::check($request->input('current_password'), $user->password)) {
                return $this->responseError(null, 'The provided password does not match your current password', Response::HTTP_NOT_FOUND);
            }

            $user->password = Hash::make($request->input('password'));
            $user->save();

            return $this->responseSuccess($user, 'Your password has been changed successfully !', Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
