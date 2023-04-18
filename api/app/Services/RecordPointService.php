<?php

namespace App\Services;

use App\Models\RecordPoint;
use Carbon\Carbon;

class RecordPointService
{
    public function __construct(private AddressService $addressService)
    {
    }
    public function fetchAll($userId)
    {
        $recordPoints = RecordPoint::where('user_id', $userId)->get();
        return $recordPoints;
    }

    public function fetchOne(int $id)
    {
        $recordPoint = RecordPoint::find($id);

        if (!$recordPoint) {
            return null;
        }

        return $recordPoint;
    }

    public function create($userId, $data)
    {
        $recordPoint = RecordPoint::create([
            'user_id' => $userId,
            'type' => $data['type'],
            'date_time' => Carbon::now()
        ]);

        return $this->fetchOne($recordPoint['id']);
    }
}
