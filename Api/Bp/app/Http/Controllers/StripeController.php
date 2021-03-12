<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

\Stripe\Stripe::setApiKey(
    'sk_test_51Gv0cPLZEYBwdlLZb3a1crfVOjZ1VAedAXvLldeR4hQ9iXWdZ3WavAODyiQpkKW4SIIR721c16QkWzy5XLR8hZ5C00EffOYySR'
);

class StripeController extends Controller
{
    public function pay(Request $request)
    {
        if ($request->token != null || $request->tokenSocials != null) {

            // return $request;
            
            $stripe_id = User::where('email', '=', $request->email)->get(
                'stripe_id'
            );

            // return $stripe_id[0]->stripe_id;

            $setcard = \Stripe\Charge::create([
                'customer' => $stripe_id[0]->stripe_id,
                'amount' => $request->prixx,
                'currency' => 'eur',
            ]);
            return $setcard;
        }
    }
}
