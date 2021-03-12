<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Image;
use App\Design;
use App\Artist;
use App\Promotion;
// use App\Http\Controllers\DB;
use Illuminate\Support\Facades\DB;

use App\Categorie;
use App\Report;
use App\Theme;

class AdminstrateurController extends Controller
{
    // PSEUDO CODE

    public function createArticle(Request $data)
    {   

        // var_dump($data);
    
        $data = $data->toArray();
  
        $article = Article::create($data);
        
        return json_encode($article->id);
    }

    public function updateImageArticle(Request $data, $id)
    {   
        // return($data);
        if($data->hasFile('url')){
            
            $file = $data->file('url');
           $extension = $file->getClientOriginalExtension();
           $fileName = time().'.'.$extension;

           $path = public_path().'/images';
       
           $uplaod = $file->move($path,$fileName);
       
        $article = Article::find($id);
        $url = "http://localhost:8000/images/".$fileName;
        $article->url_image_principal = $url;
        $article->save();
       
        return response()->json(compact('url'), 201);


         }
    }
    public function updateArticle($id, Request $data)
    {
        // return($data->promo_id);


        $article = Article::find($id);
         
        // $array = [];
        // $test = $data->toArray();
        // foreach($test as $key => $value){
            
        //     if($key == 'url_image_principal'){
        //         $key = 'url_image';
        //         $array[$key] = $value;
        //         $imageArticle = Image::create([
        //             'article_id' => $id,
        //             'url_image' => $value
        //         ]);
                     
        //     }
        // }
        // return($data);

        // foreach ($data->toArray() as $key => $value) {
        //     if($key == 'url_image_principal' ){
        //         unset($data['url_image_principal']);         
        //     }         
        //     if(!empty($data->toArray())){
        //        if($key !== 'url_image_principal'){
        //         $article->$key = $value;
        //         $article->save();
        //        }           
        //     }         
        // }
        

        foreach ($data->toArray() as $key => $value) {
            if($key == 'promo_id'){

                $article->$key = $value;
                
            }
            elseif($value !== '' && $value !== null){
                $article->$key = $value;
            }
            
        }
        $article->save();

        return json_encode('OK');

    }
    public function deleteArticle($id)
    {
        // return json_encode($id);

        $article = Article::find($id);

        $article->delete();

        return json_encode('OK');
    }
    public function RequestDesign()
    {
        // $nameDesign = Design::find(1);
        // $imageDesign = Design::where('validation', 0)->get();
        // $test = $imageDesign[0]->artiste;
        // return json_encode($imageDesign);
      $test =  DB::table('designs')
        ->select('designs.name_design','designs.id','designs.url','designs.prix','artists.username')
        ->join('artists','artists.id','=','designs.user_artist_id')
        ->where('validation', 0)
        ->get();

        // $imageDesign = Design::where('validation', 0)->get();
        // $imageDesigns = $imageDesign[0]->artiste->username;
        

        return json_encode($test);
    }
    public function ValidationDesign($id)
    {
        $imageDesign = Design::find($id);

        $imageDesign->validation = 1;

        $imageDesign->save();
        return json_encode("Design Valider par l'adminstrateur");
    }
    public function RefuseDesign($id)
    {
        // return json_encode($id);
        $nameDesign = '';
        $imageDesign = Design::find($id);
        if($imageDesign->validation === 1)
        {
            return json_encode('Design est deja valider');
        }
        else
        {
        $nameDesign = $imageDesign->name_design;
        $imageDesign->delete();

        return json_encode("Le design $nameDesign a ete refuser par l'adminstrateur");
        }
    }
    public function AddCategorie(Request $data)
    {
        // return $data;
        $data = $data->toArray();
  
        $categorie = Categorie::create($data);
        return json_encode($categorie);
    }
    public function DeleteCategorie($id)
    {
        $article = Categorie::find($id);

        $article->delete();

        return json_encode('OK');
    }

    public function ShowCategorie()
    {
        $categorie = Categorie::All();

        // $categorie->delete();

        return json_encode($categorie);
    }
    public function AddTheme(Request $data)
    {
        // return $data;
        $data = $data->toArray();
  
        $categorie = Theme::create($data);
        return json_encode($categorie);
    }
    public function DeleteTheme($id)
    {
        $article = Theme::find($id);

        $article->delete();

        return json_encode('OK');
    }

    public function ShowTheme()
    {
        $categorie = Theme::All();

        // $categorie->delete();

        return json_encode($categorie);
    }
    public function DeleteReport($id)
    {
        $article = Report::find($id);

        $article->delete();

        return json_encode('OK');
    }

    public function ShowReport()
    {
        $categorie = Report::All();

        // $categorie->delete();

        return json_encode($categorie);
    }

    public function updateStock($id, Request $data)
    {
        $article = Article::find($id);

        $valueStock = $data->stock;

        $article->stock = $valueStock;

        $article->save();

        return json_encode($article);

    }

    public function getPromotion()
    {
        $promotion = Promotion::all();

        // return $promotion;

        return json_encode($promotion);


    }

}
