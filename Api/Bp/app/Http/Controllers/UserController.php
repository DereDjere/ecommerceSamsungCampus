<?php

namespace App\Http\Controllers;

use App\Artists;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Report;

\Stripe\Stripe::setApiKey(
    'sk_test_51Gv0cPLZEYBwdlLZb3a1crfVOjZ1VAedAXvLldeR4hQ9iXWdZ3WavAODyiQpkKW4SIIR721c16QkWzy5XLR8hZ5C00EffOYySR'
);

class UserController extends Controller
{
    
    public function register(Request $request)
    {
        var_dump($request->username);
        $validator = Validator::make($request->json()->all(), [
            'username' => 'required|string|min:2|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            // 'adresse' => 'required|string',
            // 'CP' => 'required|numeric|digits_between:5,5',
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors()->toJson(), 400);
            return json_encode($validator->errors());
        }

        $customer = \Stripe\Customer::create([
            'source' => 'tok_mastercard',
            'email' => $request->json()->get('email'),
            'name' => $request->json()->get('username'),
        ]);

        $customer_id = $customer->id;

        $user = User::create([
            'username' => $request->json()->get('username'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            // 'adresse' => $request->json()->get('adresse'),
            // 'CP' => $request->json()->get('CP'),
            'stripe_id' => $customer_id,
        ]);

        $token = JWTAuth::fromUser($user);
        // return $token;

        return response()->json(compact('user', 'token'), 201);
    }


    public function login(Request $request)
    {

        $conn = $request->json()->all();
        // var_dump($request->email);

        $password = Hash::make($request->password);
        // var_dump($password);

        $controle = false;


        $user = User::where("email", "=", $request->email)->get();
        // return(isset($user));
        // return(($user));
        if(empty($user[0])){

            // return ('zebi');
            $controle = true;
        $user = Artists::where("email", "=", $request->email)->get();

        }
        $pass = Hash::check($request->password, $user[0]->password);
        //  return json_encode($pass);
  
        if ($pass == true) {
            $token = Str::random(15);
           
                $user[0]->remember_token = $token;
                $user[0]->save();
                if($controle == true){
                   return json_encode(['artist' => $user[0]->remember_token]);  
                }else{
                   return json_encode(['user' => $user[0]->remember_token]);  

                }
               
            
        } else {

            return 'invalid';
        }
    }


    

    public function show()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function updatebyid(Request $request)
    {

        $token = $request->token;
        $user_id = DB::select("select id from users where remember_token = '" .$request->token. "'");

        $user = User::find($user_id[0]->id);

        foreach ($request->toArray() as $key => $value) {
            if ($value !== '' && $value !== null && $key !== "token") {
                $user->$key = $value;

                if ($key == 'password') {
                    $user->$key = Hash::make($value);
                }
            }
        }

        $user->save();

        return response()->json($user);
    }

    public function showbyid(Request $request)
    {

        $user_id = DB::select("select id from users where remember_token = $request->token");


        $user = User::find($user_id[0]->id);
        // $user = User::find($id);
        return json_encode($user);
    }




    public function registersocials(Request $request)
    {
        $userpresent = DB::table('users')
            ->select('users.stripe_id')
            ->where('users.socials_id', '=', $request->id)
            ->get();
        if (isset($userpresent[0]) == false) {
            $validator = Validator::make($request->json()->all(), [
                'email' => 'required|string|email|max:255|unique:users',
            ]);

            if ($validator->fails()) {
                // return response()->json($validator->errors()->toJson(), 400);
                return json_encode($validator->errors());
            }

            $customer = \Stripe\Customer::create([
                'source' => 'tok_mastercard',
                'email' => $request->json()->get('email'),
                'name' => $request->name,
            ]);

            $customer_id = $customer->id;
            $token = Str::random(15);
            $user = User::create([
                'email' => $request->json()->get('email'),
                'username' => $request->name,
                'stripe_id' => $customer_id,
                'socials_id' => $request->id,
            ]);
            $user->remember_token = $token;
            $user->save();
            return $user->remember_token;
        } else {

            $userpresent = DB::table('users')
            ->select('users.remember_token')
            ->where('users.socials_id', '=', $request->id)
            ->get();

            return $userpresent[0]->remember_token;
            
            /* if (isset($userpresent[0]->stripe_id)) {
                return $userpresent[0]->stripe_id;
            } else {
                return response()->json('The email has already been taken.');
            } */
        }
    }
    public function savecard(Request $request)
    {
        // return $request;
        if (isset($request->token)) {
            return DB::update(
                'update users set saving_cards = 1 WHERE stripe_id = ?',[$request->token]
            );
        } elseif (isset($request->tokenSocials)) {
            return DB::update(
                'update users set saving_cards = 1 WHERE stripe_id = ?',[$request->tokenSocials]
            );
        } else {
            return response()->json('error');
        }
    }
    public function checksavecard(Request $request)
    {
        // return ($request);
        if (isset($request->token)) {
            return DB::table('users')
                ->select('users.saving_cards')
                ->where('users.stripe_id', '=', $request->token)
                ->get();
        } elseif (isset($request->tokenSocials)) {
            return DB::table('users')
                ->select('users.saving_cards')
                ->where('users.stripe_id', '=', $request->tokenSocials)
                ->get();
        } else {
            return response()->json('error');
        }
    }
    public function UsersReport(Request $data)
    {

        $data = $data->toArray();

        $report = Report::create($data);

        return json_encode($report);
    }
}
