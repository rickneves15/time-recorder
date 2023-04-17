<?php

namespace App\Http\Controllers;

use App\Services\AddressService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Response;

class AddressController extends Controller
{
    use ResponseTrait;

    public function __construct(private AddressService $addressService)
    {
    }

    public function getAddress($cep)
    {
        try {
            return $address = $this->addressService->getAddress($cep);
            return $this->responseSuccess($address, 'Get Address With CEP Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
