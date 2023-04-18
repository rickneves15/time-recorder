<?php

namespace App\Http\Middleware;

use App\Models\Roles;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class EmployeeMiddleware
{
    use ResponseTrait;

    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role_id === Roles::ROLES['EMPLOYEE']) {
            return $next($request);
        }

        return $this->responseError(null, 'Unauthorized', Response::HTTP_UNAUTHORIZED);
    }
}
