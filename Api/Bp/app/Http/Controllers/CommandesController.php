<?php

namespace App\Http\Controllers;

// use App\Commandes;
use App\Commande;
use App\User;
use App\Cb;
use App\Articlebycommande;
use App\Spritebycommande;
use App\Designbycommande;
use App\Article;

use ArrayObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mockery\Undefined;

class CommandesController extends Controller
{
    public function envoie(Request $request)
    {

        // return($request);

        
        $validator = Validator::make($request->json()->all(), [
            'firstname' => 'required|string|min:1|max:255',
            'lastname' => 'required|string|min:1|max:255',
            'adress' => 'required|string|min:1|max:255',
            'city' => 'required|string',
            'cp' => 'required|numeric|digits_between:5,5',
            'country' => 'required|string|min:1|max:255',
        ]);


        // $validator = Validator::make($request->json()->all(), [
        //     'firstname' => 'required|string|min:1|max:255',
        //     'lastname' => 'required|string|min:1|max:255',
        //     'adress' => 'required|string|min:1|max:255',
        //     'city' => 'required|string',
        //     'cp' => 'required|numeric|digits_between:5,5',
        //     'country' => 'required|string|min:1|max:255',
        // ]);

        // if ($validator->fails()) {
        //     // return response()->json($validator->errors()->toJson(), 400);
        //     return json_encode($validator->errors());
        // }
        $refCommande = random_bytes(6);
        $refCommande = strtoupper(bin2hex($refCommande));

        // return(json_encode($refCommande));

        $status = 'en cours de préparation';


        $commande = Commande::create([
            'firstname' => $request->json()->get('firstname'),
            'lastname' => $request->json()->get('lastname'),
            'adress' => $request->json()->get('adress'),
            'city' => $request->json()->get('city'),
            'cp' => $request->json()->get('cp'),
            'country' => $request->json()->get('country'),
            'email' => $request->json()->get('email'),
            'prix_total' => $request->prix_total,
            'ref_commande' => $refCommande,
            'status_commande' => $status

        ]);

        $idCommande = $commande->id;

        foreach ($request->products as $key => $value) {
            // dd($key);
            // return json_encode(($request->products[0]['design_id']));
            $article = Articlebycommande::create([

                'id_commande' => $idCommande,
                'id_article' => $request->products[$key]['article_id'],

            ]);
            $designs = Designbycommande::create([

                'id_commande' => $idCommande,
                'id_designs' => $request->products[$key]['design_id'],

            ]);
            $sprite = Spritebycommande::create([

                'id_commande' => $idCommande,
                'id_sprite' => $request->products[$key]['sprite_id'],

            ]);
        }




        return response()->json(compact('commande'), 201);
    }



    public function envoieUsers(Request $request)
    {

 


        $user_id = DB::select("select id from users where remember_token = $request->token");


        $user = User::find($user_id[0]->id);
        // return($user);
        foreach ($request->products as $key => $value) {

            // 'id_article' => $request->products[$key]['article_id'],
            


        }
        if($request->isChecked == false)
        {
            $user->address = $request->json()->get('adress');
            $user->city = $request->json()->get('city');
            $user->country = $request->json()->get('country');
            $user->lastname = $request->json()->get('lastname');
            $user->firstname = $request->json()->get('firstname');
            $user->cp = $request->json()->get('cp');
            $user->isChecked = true;
            $user->save();
        }

        $refCommande = random_bytes(6);
        $refCommande = strtoupper(bin2hex($refCommande));
        // return json_encode($refCommande);
        $status = 'en cours de préparation';



        $commande = Commande::create([

            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'adress' => $request->adress,
            'city' => $request->city,
            'cp' => $request->cp,
            'country' => $request->country,
            'prix_total' => $request->prix_total,
            'user_id' =>  $user_id[0]->id,
            'ref_commande' => $refCommande,
            'status_commande' => $status,


        ]);

        $idCommande = $commande->id;
  


        foreach ($request->products as $key => $value) {
         
            $article = Articlebycommande::create([

                'id_commande' => $idCommande,
                'id_article' => $request->products[$key]['article_id'],

            ]);
            $designs = Designbycommande::create([

                'id_commande' => $idCommande,
                'id_designs' => $request->products[$key]['design_id'],

            ]);
            $sprite = Spritebycommande::create([

                'id_commande' => $idCommande,
                'id_sprite' => $request->products[$key]['sprite_id'],

            ]);
        }


        return json_encode($commande);
    }
    public function isChecked(Request $request)
    {
        $isChecked = DB::select("select * from users where remember_token = $request->token");

        return json_encode($isChecked);
    }

    public function ListCommands(Request $request)
    {
        $id = DB::select("select id from users where remember_token = $request->token");

        $Listdetaille = DB::select("SELECT * FROM `commandes` where user_id = " . $id[0]->id);
        
        return json_encode($Listdetaille); 

    }



    public function commande()
    {


        $test =  DB::table('commandes')
        ->select('ref_commande', 'prix_total', 'commandes.firstname', 'commandes.lastname', 'commandes.country', 'users.email', 'commandes.created_at as date')
        ->selectRaw('GROUP_CONCAT(articles.titre ORDER BY articles.id) as titleArticle')
        //->groupBy('articlebycommandes.id')

        // ->selectRaw('GROUP_CONCAT(designs.name_design ORDER BY designs.id) as nameDesign')
        // ->orderBy('user_id')
        ->leftJoin('users','users.id','=','commandes.user_id')
        ->leftJoin('articlebycommandes','commandes.id', '=', 'articlebycommandes.id_commande')
        ->leftJoin('articles','articles.id','=','articlebycommandes.id_article')
        // ->leftJoin('designbycommandes','commandes.id','=','designbycommandes.id_commande')
        // ->leftJoin('designs','designs.id','=','designbycommandes.id_designs')
        ->where('commandes.user_id','!=', NULL)
        ->groupBy('commandes.id')
        // ->distinct()
        ->get();

        $testGuest =  DB::table('commandes')
        ->select('ref_commande', 'prix_total', 'firstname', 'lastname', 'country', 'email', 'commandes.created_at as date')
        ->selectRaw('GROUP_CONCAT(articles.titre ORDER BY articles.id) as titleArticle')
        //->groupBy('articlebycommandes.id')

        // ->selectRaw('GROUP_CONCAT(designs.name_design ORDER BY designs.id) as nameDesign')
        // ->orderBy('user_id')
        // ->leftJoin('users','users.id','=','commandes.user_id')
        ->leftJoin('articlebycommandes','commandes.id', '=', 'articlebycommandes.id_commande')
        ->leftJoin('articles','articles.id','=','articlebycommandes.id_article')
        // ->leftJoin('designbycommandes','commandes.id','=','designbycommandes.id_commande')
        // ->leftJoin('designs','designs.id','=','designbycommandes.id_designs')
        ->where('commandes.user_id','=', NULL)
        ->groupBy('commandes.id')
        // ->distinct()
        ->get();



        $pat =  DB::table('commandes')
        ->select('ref_commande', 'prix_total', 'firstname', 'lastname', 'country', 'email')
        // ->selectRaw('GROUP_CONCAT(articles.titre ORDER BY articles.id) as titleArticle')
        //->groupBy('articlebycommandes.id')

        ->selectRaw('GROUP_CONCAT(designs.name_design ORDER BY designs.id) as titleArticle')
        // ->orderBy('user_id')
        // ->leftJoin('articlebycommandes','commandes.id', '=', 'articlebycommandes.id_commande')
        ->leftJoin('designbycommandes','commandes.id','=','designbycommandes.id_commande')
        ->leftJoin('designs','designs.id','=','designbycommandes.id_designs')
        ->where('commandes.user_id','!=', NULL)
        ->groupBy('commandes.id')
        // ->distinct()
        ->get();

        $patGuest =  DB::table('commandes')
        ->select('ref_commande', 'prix_total', 'firstname', 'lastname', 'country', 'email')
        // ->selectRaw('GROUP_CONCAT(articles.titre ORDER BY articles.id) as titleArticle')
        //->groupBy('articlebycommandes.id')

        ->selectRaw('GROUP_CONCAT(designs.name_design ORDER BY designs.id) as titleArticle')
        // ->orderBy('user_id')
        // ->leftJoin('articlebycommandes','commandes.id', '=', 'articlebycommandes.id_commande')
        ->leftJoin('designbycommandes','commandes.id','=','designbycommandes.id_commande')
        ->leftJoin('designs','designs.id','=','designbycommandes.id_designs')
        ->where('commandes.user_id','=', NULL)
        ->groupBy('commandes.id')
        // ->distinct()
        ->get();

        // $tester =  DB::table('commandes')
        // ->select('ref_commande', 'prix_total', 'users.firstname', 'users.lastname', 'users.country', 'users.email')
        // ->leftJoin('users','commandes.user_id', '=', 'users.id')
        // ->where('commandes.user_id','!=', NULL)
        // ->get();

        $tester =  DB::table('commandes')
        ->select('ref_commande', 'prix_total', 'firstname', 'lastname', 'country', 'email')
        ->where('commandes.user_id','=', NULL)
        ->get();

        // $tab = $test;
        // var_dump(count($test));

        // return ($test);
        // return ($testGuest);



        $tabTest = [];
       for($i = 0; $i < count($test); $i++){

        $test[$i]->design = $pat[$i]->titleArticle;
        array_push($tabTest,$test[$i]);
        
       }

       for($i = 0; $i < count($testGuest); $i++){

        $testGuest[$i]->design = $patGuest[$i]->titleArticle;
        array_push($tabTest,$testGuest[$i]);
       }
        



        // $result = $test->union($pat);


        // return ($patGuest);

        return json_encode($tabTest);
    }


    function statistiqueStock(){



        $articleStock =  DB::table('articlebycommandes')
        ->select('articles.titre as name_article', 'articles.stock', DB::raw("(SELECT COUNT(articlebycommandes.id)) as article_achete"))

        ->leftJoin('articles','articles.id','=','articlebycommandes.id_article')

        ->groupBy('articlebycommandes.id_article')

        ->get();

    
    
        $designStock =  DB::table('designbycommandes')
        ->select('designs.name_design as name_design', 'artists.username as designer', DB::raw("(SELECT COUNT(designbycommandes.id)) as design_achete"))
        ->leftJoin('designs','designs.id','=','designbycommandes.id_designs')
        ->leftJoin('artists','designs.user_artist_id','=','artists.id')
        ->groupBy('designbycommandes.id_designs')
        ->get();
    

    
        return(['designStock' => ($designStock),'articleStock' => ($articleStock)]);

    }


    function getCommandePrepa(){

        $commande = Commande::where('status_commande', 'en cours de préparation')->get();

        return json_encode($commande);



    }

    function updateCommandeLivraison($id){

        $commande = Commande::find($id);
        $commande->status_commande = 'en cours de livraison';
    
        $commande->save();

        return json_encode($commande);



    }


    function getCommandeLivraison(){

        $commande = Commande::where('status_commande', 'en cours de livraison')->get();

        return $commande;

    }

    function updateCommandeLivre($id){

        $commande = Commande::find($id);
        $commande->status_commande = 'commande livrée';
    
        $commande->save();

        return json_encode($commande);



    }

    function getCommandeLivrée(){

        $commande = Commande::where('status_commande', 'commande livrée')->get();

        return $commande;

    }

    function DeleteCommandeLivré($id){

        $commande = Commande::find($id);
        $commande->status_commande = 'terminé';
    
        $commande->save();

        return json_encode('OK');
    }



    public function FacturePriceCommands(Request $request)
    {   
        $Listdetaille = DB::select("SELECT prix_total FROM `commandes` where id = $request->id");
        
        return json_encode($Listdetaille);
    }
    public function FactureArticleCommands(Request $request){
        $article = DB::select('SELECT * from articlebycommandes LEFT JOIN articles ON articlebycommandes.id_article = articles.id where articlebycommandes.id_commande  = ?', [$request->id_commands]);
        return json_encode($article);
    }
    public function FactureDesignCommands(Request $request){
        $design = DB::select('SELECT * from designbycommandes LEFT JOIN designs ON designbycommandes.id_designs = designs.id where designbycommandes.id_commande  = ?', [$request->id_commands]);
        return json_encode($design);
    }
    public function SearchCommands(Request $request)
    {
        $id = DB::select("select id from users where remember_token = $request->token");
        if($request->ref != '' || $request->ref != null || $request->ref != 'undefined' )
        {
            $searchDetail = DB::select("SELECT * FROM `commandes` where (user_id = " . $id[0]->id . " AND ref_commande LIKE '%" . $request->ref . "%')");
        }
        else
        {
            $searchDetail = DB::select("SELECT * FROM `commandes` where user_id = " . $id[0]->id);
        }
            
        return json_encode($searchDetail);
    }
    
}

