<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;


class AbonnementController extends Controller
{
    //

    public function subscrib($tokensub)
    {
        // return json_encode('hello');
        // return json_encode($tokensub);


        $user = user::where('remember_token', '=', $tokensub)->get('id');
        // return($user[0]);
        $user = user::find($user[0]);
        // return json_encode($user[0]);
        





        $user[0]->subscription = 1;
        $user[0]->save();
        return json_encode($user);

    }


    public function checkSubscrib($tokensub)
    {
        // return ($tokensub);

        $user = user::where('remember_token', '=', $tokensub)->get('id');
        // return($user[0]);
        $user = user::find($user[0]);
        // return $user[0];
        if($user[0]->subscription == 1){

            return json_encode(true);
        }else{

            return json_encode(false);

        }

    }

}
