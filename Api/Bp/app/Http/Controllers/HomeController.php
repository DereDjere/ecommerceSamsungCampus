<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Image;
use App\Design;
use App\Promotion;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Str;

// use SplFileInfo;

class HomeController extends Controller
{


    function showAll()
    {

        // $token = Str::random(15);
        // return $token;

        $article = Article::all();
        // $count = $article->count();
        // if($count > 6){
        // $article = Article::all()->random(6);

        // }
        // ->select('articles.id, articles.genres, articles.categorie_id, articles.colors, articles.titre, articles.description, articles.caracteristique, articles.url_image_principal, articles.stock, article.prix , articles.compteur_visite, promotions.name_promo, promotions.reductions')



        // $info = new SplFileInfo("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png");
        // $result = ($info->getExtension());

        $article =  DB::table('articles')
            ->select('articles.id', 'articles.genres', 'articles.categorie_id', 'articles.colors', 'articles.titre', 'articles.description', 'articles.caracteristique', 'articles.url_image_principal', 'articles.stock', 'articles.prix', 'articles.compteur_visite', 'promotions.name_promo', 'promotions.reductions')
            ->leftJoin('promotions', 'promotions.id', '=', 'articles.promo_id')

            // ->where('commandes.user_id','!=', NULL)
            // ->groupBy('articles.id')
            // ->distinct()
            ->get();

        // return $article;

        return json_encode($article);
    }
    function showByVisiteOne()
    {
        $article = Article::orderBy('compteur_visite', 'DESC')->paginate(3);

        return json_encode($article);
    }

    function showByVisiteTwo()
    {
        $article = Article::orderBy('compteur_visite', 'DESC')->skip(3)->take(3)->get();

        return json_encode($article);
    }

    function showDesign()
    {

        $imageDesign = Design::where('validation', '=', 1)->inRandomOrder()->limit(6)->get();
     
        return json_encode($imageDesign);
    }
}
