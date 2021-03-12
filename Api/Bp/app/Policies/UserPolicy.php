<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function update(User $user, User $user_model)
    {
        return $user->id === $user_model->id ? Response::allow() : Response::deny();
    }
}
