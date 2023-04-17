<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition()
    {
        $url = "geradornv.com.br/wp-json/api/cep/random-by-states?state=SP";
        $response = Http::get($url);
        $address = $response->json();
        return [
            'cep' => $address['cep'],
            'street' => $address['street'],
            'number' => fake()->buildingNumber(),
            'neighborhood' => $address['neighborhood'],
            'city' => $address['city'],
            'state' => $address['state'],
        ];
    }
}
