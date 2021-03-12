<?php

namespace App\Http\Controllers;

// use App\Artist;

use App\Artist;
use App\Artists;
use App\Theme;
use App\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;
// use Tymon\JWTAuth\Exceptions\JWTException;

class ArtistsController extends Controller
{

    public function RegisterArtists(Request $request)
    {
        // return $request;
        $validator = Validator::make($request->json()->all(), [
            'username' => 'required|string|min:5|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            // 'description' => 'string|max:30',
            // 'profil_img' => 'image|nullable',
            // 'siret' => 'required|numeric|digits_between:14,14',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return json_encode($validator->errors());
        }

        $user = Artists::create([
            'username' => $request->json()->get('username'),
            'email' => $request->json()->get('email'),
            // 'description' => $request->json()->get('description'),
            // 'profil_img' => $request->json()->get('profil_img'),
            // 'siret' => $request->json()->get('siret'),
            'password' => Hash::make($request->json()->get('password')),

        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function LoginArtists(Request $request)
    {


        $conn = $request->json()->all();
        var_dump($request->email);

        $password = Hash::make($request->password);
        var_dump($password);


        $user = Artists::where("email", "=", $request->email)->get();
        $pass = Hash::check($request->password, $user[0]->password);
        //  return json_encode($pass);


        if ($pass == true) {
            $token = Str::random(15);
            $user[0]->remember_token = $token;
            $user[0]->save();
            return json_encode($user[0]->remember_token);
        } else {

            return "invalid";
        }
    }


    public function AddDesign(Request $request, $id)
    {
      

       
            $idTheme = Theme::where('nameTheme' , $request->theme)->get('id')[0];
        $idTheme =  $idTheme->id;
        // return json_encode($idTheme);


        $design = Design::create([
                'name_design' => $request->name_design,
                'user_artist_id' => $id,
                'prix' => $request->prix,
                'theme_id' => $idTheme,
        ]);

        $id = $design->id;

        return response()->json(compact('id'), 201);



    }


    public function AddUrlDesign(Request $request, $id)
    {   
    //   return $request;

        if($request->hasFile('url')){
            // return($request);
            $file = $request->file('url');
           $extension = $file->getClientOriginalExtension();
           $fileName = time().'.'.$extension;

           $path = public_path().'/images';
       
           $uplaod = $file->move($path,$fileName);
       
        $design = Design::find($request->id);
        $url = "http://localhost:8000/images/".$fileName;
        $design->url = $url;
        $design->save();
        // return $url;
        // return json_encode('ok');
        return response()->json(compact('design'), 201);


         }


    }



    public function AddPhotoProfil(Request $request, $id)
    {   
    //   return $request;
    // return response()->json($request, 201);


        if($request->hasFile('url')){
            // return($request);
            $file = $request->file('url');
           $extension = $file->getClientOriginalExtension();
           $fileName = time().'.'.$extension;

           $path = public_path().'/images';
       
           $uplaod = $file->move($path,$fileName);
       
        $artist = Artist::find($id);
        $url = "http://localhost:8000/images/".$fileName;
        $artist->profil_img = $url;
        $artist->save();
       
        return response()->json(compact('url'), 201);


         }


    }


    public function EditProfil(Request $request, $id)
    {

     

        $artist = Artist::find($id);


        foreach ($request->toArray() as $key => $value) {
            
            if($value !== '' && $value !== null){

                $artist->$key = $value;
            }
            
        }
        $artist->save();

        return json_encode($artist);

     
    }


    public function InfoArtists($id)
    {

   

        $artist = Artists::find($id);

        return json_encode($artist);

        // $user = Artists::where("remember_token", $request->token)->get();
        // $userId = $user[0]->id;


     
    }

    public function ShowTheme()
    {

        /// name_design; user_artist_id; validation ?; url ; prix; theme_id;

        /// get ID artist ; get ID theme

        $themes = Theme::all();

        return json_encode($themes);

        // $user = Artists::where("remember_token", $request->token)->get();
        // $userId = $user[0]->id;


     
    }

    public function verifArtisLog(request $request, $id)
    {
   
        $token = $request->token;
        // return ($request);
   

        $verifArtist =  DB::table('artists')
        ->select('artists.remember_token')
        ->where('id', $id)
        ->get();
        // $verifArtist = Artist::where('id', $id)->get();

        // return($verifArtist[0]->remember_token);

        if($token == $verifArtist[0]->remember_token){

            return 'true';

        }else{

            return 'false';

        }

        // return 'false';

    }

    public function getId(request $request)
    {
   
        $token = $request->token;
        // return ($request);
   

        $getIdArtist =  DB::table('artists')
        ->select('artists.id')
        ->where('artists.remember_token', $token)
        ->get();
        // $verifArtist = Artist::where('id', $id)->get();

        return json_encode($getIdArtist[0]->id);


        // return 'false';

    }
    


    public function getDesignArtiste($id){
        // return json_encode($id);

        $verifArtist =  DB::table('designs')
        ->select('designs.name_design', 'designs.url')
        ->leftJoin('artists', 'artists.id', '=', 'designs.user_artist_id')
        ->where('validation', 1)
        ->where('artists.id', $id)
        ->get();

        
        return json_encode($verifArtist);
    }

    
}
