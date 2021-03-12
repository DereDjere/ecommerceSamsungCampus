<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Categorie;
use App\Promotion;
use App\Image;
use App\Quantite;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function showAll()
    {
        $annonce = Article::all();


        $annonce = DB::table('articles')
        ->leftjoin(
            'promotions',
            'promotions.id',
            '=',
            'articles.promo_id'
        )
        ->select(
            'articles.id',
            'articles.genres',
            'articles.colors',
            'articles.titre',
            'articles.description',
            'articles.caracteristique',
            'articles.url_image_principal',
            'articles.prix',
            'promotions.reductions'
            
        )

        ->get();
    
        return json_encode($annonce);
    }
    public function show($id)
    {
        $annonce = DB::table('articles')
        ->leftjoin(
            'promotions',
            'promotions.id',
            '=',
            'articles.promo_id'
        )
        ->select(
            'articles.id',
            'articles.genres',
            'articles.colors',
            'articles.titre',
            'articles.description',
            'articles.caracteristique',
            'articles.url_image_principal',
            'articles.prix',
            'promotions.reductions'
            
        )
            ->where('articles.id', '=', $id)
            ->get();

        return json_encode($annonce);
    }
    public function showByFilter(Request $data)
    {
        $data = $data->toArray();
        // var_dump($data);
        // return $data;
        // // $query = Article::query();
        // $tab =[];
        // $query = DB::table('articles')->leftjoin('categories', 'categories.id', '=', 'articles.categorie_id')->select('articles.id','articles.genres', 'articles.colors', 'articles.titre', 'articles.description', 'articles.caracteristique', 'articles.url_image_principal', 'articles.prix', 'categories.nameCategories');
        // foreach ($data as $key => $value) {
           
        //         $tab[$key]= $value;
        
        // } 

        // $filter = $query->where(
        //     $tab
        //     )->get();

        // // var_dump($filter);
        // // $annonce = Article::where('categories', '=', $name)->get(); */
        $tab = [];
        $query = DB::table('articles')
            ->leftjoin(
                'categories',
                'categories.id',
                '=',
                'articles.categorie_id'
            )
            ->leftjoin('quantites', 'quantites.article_id', '=', 'articles.id')
            ->leftjoin(
                'promotions',
                'promotions.id',
                '=',
                'articles.promo_id'
            )
            ->select(
                'articles.id',
                'articles.genres',
                'articles.colors',
                'articles.titre',
                'articles.description',
                'articles.caracteristique',
                'articles.url_image_principal',
                'articles.prix',
                'categories.nameCategories',
                'promotions.reductions'

                
            );


        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                $tab[$key] = $value;
            }
        }
        $filter = $query->where($tab)->get();

        return json_encode($filter);
    }
    public function FilterCategorie()
    {
        $categorie = Categorie::all();

        return json_encode($categorie);
    }
    public function visiteArticle(request $addVisite, $id)
    {
        // return $addVisite;
        $article = DB::table('articles')
            ->where('articles.id', '=', $id)
            ->select('compteur_visite')
            ->get();

        $nbrVisite = $article[0]->compteur_visite;
        $addVisite = $addVisite->compteur_visite;

        $addVue = $nbrVisite + $addVisite;
        $articleUpdate = Article::find($id);
        $articleUpdate->compteur_visite = $addVue;

        $articleUpdate->save();

        return json_encode($article[0]->compteur_visite + 1);
    }
    public function showFilter(Request $request){

        $query = $request->filter;

        $annonce = DB::table('articles')
        ->leftjoin(
            'categories',
            'categories.id',
            '=',
            'articles.categorie_id'
        )
        ->leftjoin('quantites', 'quantites.article_id', '=', 'articles.id')
        ->select(
            'articles.id',
            'articles.genres',
            'articles.colors',
            'articles.titre',
            'articles.description',
            'articles.caracteristique',
            'articles.url_image_principal',
            'articles.prix',
            'categories.nameCategories'
            
        )
        ->where('articles.titre', 'LIKE', "%$query%")
        ->orWhere('articles.colors','LIKE',"%$query%")
        ->orWhere('articles.genres','LIKE',"%$query%")
        ->get();

        return json_encode($annonce);
    }
    
}
