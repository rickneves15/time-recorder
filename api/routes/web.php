<?php

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Response $response) {
    return response()->json([
        "message" => "Welcome"
    ]);
});
