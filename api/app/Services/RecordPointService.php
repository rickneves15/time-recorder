<?php

namespace App\Services;

use App\Models\RecordPoint;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RecordPointService
{
    public function __construct(private AddressService $addressService)
    {
    }
    public function fetchAll($managerId, $startDate, $endDate)
    {
        $startDate = Carbon::create($startDate);
        $endDate = Carbon::create($endDate);

        $startOfDate = $startDate->startOfDay()->toDateTimeString();
        $endOfDate = $endDate->endOfDay()->toDateTimeString();

        $recordPoints = DB::select("
                SELECT
                    u.id,
                    u.name,
                    r.name as role,
                    m.name as manager,
                    extract(year FROM age(u.birthday)) AS age,
                    to_char(rp.date_time, 'DD/MM/YYYY HH24:MI:SS') AS register_point_date_time
                FROM 
                    users u
                    LEFT JOIN users m ON m.id = u.manager_id
                    INNER JOIN roles r ON r.id = u.role_id
                    INNER JOIN record_points rp ON rp.user_id = u.id
                WHERE
                    m.id = ?
                    AND rp.date_time BETWEEN ? AND ?
                ORDER BY 
                    u.id, rp.date_time", [$managerId, $startOfDate, $endOfDate]);

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
            'date_time' => Carbon::now()
        ]);

        return $this->fetchOne($recordPoint['id']);
    }
}
