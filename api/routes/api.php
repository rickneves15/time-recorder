<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecordPointController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    Route::middleware(['admin'])->group(function () {
        Route::get('users', [UsersController::class, 'index']);
        Route::get('users/{id}', [UsersController::class, 'show']);
        Route::post('users', [UsersController::class, 'store']);
        Route::put('users/{id}', [UsersController::class, 'update']);
        Route::delete('users/{id}', [UsersController::class, 'destroy']);

        Route::get('get-address/{cep}', [AddressController::class, 'getAddress']);

        Route::get('record-points', [RecordPointController::class, 'index']);
    });

    Route::middleware(['employee'])->group(function () {
        Route::get('record-points/{id}', [RecordPointController::class, 'show']);
        Route::post('record-points', [RecordPointController::class, 'store']);

        Route::post('/users/change-password', [UsersController::class, 'changePassword']);
    });
});
