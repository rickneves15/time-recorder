<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\Login;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    use ResponseTrait;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Login $request)
    {
        try {
            $validation = $request->validated();
            $credentials = $request->only(['email', 'password']);

            if (!Auth::attempt($credentials)) {
                return $this->responseError(null, 'Invalid email or password', Response::HTTP_UNAUTHORIZED);
            }

            $token = auth()->attempt($credentials);
            $data = [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => auth()->user()
            ];

            return $this->responseSuccess($data, 'Login successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();

            return $this->responseSuccess(null, 'Logout successfully !', Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }
}
