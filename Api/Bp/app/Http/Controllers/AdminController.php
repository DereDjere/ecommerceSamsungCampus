<?php

namespace App\Http\Controllers;

use App\Admin;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminController extends Controller
{

    public function register(Request $request)
    {


        $validator = Validator::make($request->json()->all(), [
            'username' => 'required|string|min:2|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            // return response()->json($validator->errors()->toJson(), 400);
            return json_encode($validator->errors());
        }

        $user = Admin::create([
            'username' => $request->json()->get('username'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),

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


         $admin = Admin::where("email", "=", $request->email)->get();
         $pass = Hash::check($request->password,$admin[0]->password);
        //  return json_encode($pass);


        if($pass == true){
            $token = Str::random(15);
            $admin[0]->remember_token = $token;
            $admin[0]->save();
            return json_encode($admin[0]->remember_token);

        }
        else{
            
            return 'Invalid';
            
        }

        // return $admin[0]->password;



    //     try {
    //         if (!$token = JWTAuth::attempt($conn)) {
    //             return response()->json(['error' => 'invalide_login'], 400);
    //         }
    //     } catch (JWTException $e) {
    //         return response()->json(['error' => 'issue_token'], 500);
    //     }
    //     return response()->json(compact('token'));
    // }
    }
    
}
