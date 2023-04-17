<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('users', [UsersController::class, 'index']);
Route::get('users/{id}', [UsersController::class, 'show']);
Route::post('users', [UsersController::class, 'store']);
Route::put('users/{id}', [UsersController::class, 'update']);
Route::delete('users/{id}', [UsersController::class, 'destroy']);

Route::get('get-address/{cep}', [AddressController::class, 'getAddress']);
