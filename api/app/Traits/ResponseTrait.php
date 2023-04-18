<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseTrait
{
    public function responseSuccess($data, $message = "Successful", $status_code = JsonResponse::HTTP_OK): JsonResponse
    {
        return response()->json($data, $status_code);
    }

    public function responseError($errors, $message = 'Data is invalid', $status_code = JsonResponse::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors'  => $errors,
        ], $status_code);
    }
}
