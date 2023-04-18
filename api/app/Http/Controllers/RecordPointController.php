<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordPoints\Store;
use App\Services\RecordPointService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class RecordPointController extends Controller
{
    use ResponseTrait;

    public function __construct(private RecordPointService $recordPointService)
    {
    }

    public function index()
    {
        try {
            $user = Auth::user();

            $users = $this->recordPointService->fetchAll($user->id);
            return $this->responseSuccess($users, 'Record Points List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Store $request)
    {
        try {
            $user = Auth::user();
            $validation = $request->validated();

            $user = $this->recordPointService->create($user->id, $request->all());
            return $this->responseSuccess($user, 'Record Point Created Successfully !', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(int $id)
    {
        try {
            $user = $this->recordPointService->fetchOne($id);
            if (is_null($user)) {
                return $this->responseError(null, 'Record Point Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($user, 'Record Point Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
