<?php

namespace App\Http\Controllers;

use App\User;
use App\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PayementController extends Controller
{
    public function AdressSave(Request $request)
    {   
        $check = $request->isChecked;
        
        if($check == false)
        {
            $user_id = User::where('remember_token','=', $request->token)->get();
            


            $user = User::find($user_id[0]->id);
    
            $user->address = $request->address;
            $user->city = $request->city;
            $user->country = $request->country;
            $user->cp = $request->cp;
            $user->lastname = $request->lastname;
            $user->firstname = $request->firstname;
            $user->isChecked = $request->isChecked;
            $user->save();

            return json_encode($user);
        }
        else{
            return json_encode("l'utilisateur ne veut pas sauvegarder c'est coordonnees");
        }
    }
    public function PayementMethodSave(Request $request)
    {
        
    }
}
