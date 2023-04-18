<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordPoints\Filters;
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

    public function index(Filters $request)
    {
        try {
            $user = Auth::user();
            $data = $request->all();

            $recordPoints = $this->recordPointService->fetchAll($user->id, $data['startDate'], $data['endDate']);
            return $this->responseSuccess($recordPoints, 'Record Points List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Store $request)
    {
        try {
            $user = Auth::user();
            $validation = $request->validated();

            $recordPoint = $this->recordPointService->create($user->id, $request->all());
            return $this->responseSuccess($recordPoint, 'Record Point Created Successfully !', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(int $id)
    {
        try {
            $recordPoint = $this->recordPointService->fetchOne($id);
            if (is_null($recordPoint)) {
                return $this->responseError(null, 'Record Point Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($recordPoint, 'Record Point Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
