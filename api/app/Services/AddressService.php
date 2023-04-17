<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AddressService
{
    public function getAddress(string $cep)
    {
        $url = "http://viacep.com.br/ws/ws/$cep/json";
        $response = Http::get($url);


        $data = $response->json();

        $address = [
            'cep' =>  str_replace('-', '', $data['cep']),
            'street' => $data['logradouro'],
            'neighborhood' => $data['bairro'],
            'city' => $data['localidade'],
            'state' => $data['uf'],
        ];



        return $address;
    }
}
