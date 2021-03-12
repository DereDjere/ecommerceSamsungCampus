<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Image;
use App\Design;
use App\Sprite;
use SebastianBergmann\Environment\Console;
use Illuminate\Support\Facades\DB;
use SplFileInfo;

class SpriteController extends Controller
{
    public function FusionAction(Request $request)
    {
        /////// 600 x 600
           
        
        $url_article = DB::table('articles')->select('articles.url_image_principal')->where('articles.id', '=', $request->articleID)->get();
        $url_design = DB::table('designs')->select('designs.url')->where('designs.id', '=', $request->designID)->get();
        $article_extn = substr($url_article, strrpos($url_article, '.')+1, 3);
        $design_extn = substr($url_design, strrpos($url_design, '.')+1, 3);
        $info_design = new SplFileInfo($url_design[0]->url);
        
        $urlDesign = ($info_design->getExtension());
        $info_article = new SplFileInfo($url_article[0]->url_image_principal);
        
        $urlArticle = ($info_article->getExtension());
       
        
        $path = public_path();


        if ($urlArticle === 'jpg' || $urlArticle === 'jpeg') {
        
            if(stripos($url_article[0]->url_image_principal, 'http://localhost:8000/') !== false)
                {
                    $article = str_replace('http://localhost:8000/','',$url_article[0]->url_image_principal);
                    $source = imagecreatefromjpeg($path.'/'.$article);
                }
                else
                {
                    $source = imagecreatefromjpeg($url_article[0]->url_image_principal);
                }
            
        } elseif ($urlArticle === 'png') {

            if(stripos($url_article[0]->url_image_principal, 'http://localhost:8000/') !== false)
                {
                    $article = str_replace('http://localhost:8000/','',$url_article[0]->url_image_principal);
                    $source = imagecreatefrompng($path.'/'.$article);
                }
                else
                {
                    $source = imagecreatefrompng($url_article[0]->url_image_principal);

                }

        }

        if ($urlDesign == 'jpg' || $urlDesign == 'jpeg') {

            if(stripos($url_design[0]->url, 'http://localhost:8000/') !== false)
                {

                    $design = str_replace('http://localhost:8000/','',$url_design[0]->url);
                    $destination = imagecreatefromjpeg($path.'/'.$design);
                }
                else
                {
                    $destination = imagecreatefromjpeg($url_design[0]->url);
                }
            
        } elseif ($urlDesign === 'png') {
            if(stripos($url_design[0]->url, 'http://localhost:8000/') !== false)
                {

                    $design = str_replace('http://localhost:8000/','',$url_design[0]->url);
                  
                    $destination = imagecreatefrompng($path.'/'.$design);
                }
                else
                {
                    $destination = imagecreatefrompng($url_design[0]->url);
                }

            
        }
        // On charge d'abord les images
        // Le logo est la source
        // La photo est la destination

        // Les fonctions imagesx et imagesy renvoient la largeur et la hauteur d'une image
        $largeur_source = imagesx($source);
        $hauteur_source = imagesy($source);
        $largeur_destination = imagesx($destination);
        $hauteur_destination = imagesy($destination);
        //image redimensionner
        if (
            $request->size == 'Large' ||
            ($request->position == 'Center' && $request->size == 'Large')
        ) {
            imagecopyresampled(
                $source,
                $destination,
                $largeur_source - 450,
                $hauteur_source - 450,
                0,
                0,
                300,
                300,
                $largeur_destination,
                $hauteur_destination
            );
        }
        if (
            $request->size == 'Medium' ||
            ($request->position == 'Center' && $request->size == 'Medium')
        ) {
            imagecopyresampled(
                $source,
                $destination,
                $largeur_source - 400,
                $hauteur_source - 400,
                0,
                0,
                200,
                200,
                $largeur_destination,
                $hauteur_destination
            );
        }
        if ($request->position == 'Center' && $request->size == 'Small') {
            imagecopyresampled(
                $source,
                $destination,
                $largeur_source - 350,
                $hauteur_source - 350,
                0,
                0,
                100,
                100,
                $largeur_destination,
                $hauteur_destination
            );
        }
        if ($request->size == 'Small' && $request->position == 'TopRight') {
            imagecopyresampled(
                $source,
                $destination,
                $largeur_source - 250,
                $hauteur_source - 470,
                0,
                0,
                100,
                100,
                $largeur_destination,
                $hauteur_destination
            );
        }
        if ($request->size == 'Small' && $request->position == 'TopLeft') {
            imagecopyresampled(
                $source,
                $destination,
                $largeur_source - 450,
                $hauteur_source - 470,
                0,
                0,
                100,
                100,
                $largeur_destination,
                $hauteur_destination
            );
        }

        // imagecopyresampled($source, $destination, 191, 98, 0, 0, 240, 183, $largeur_destination, $hauteur_destination); // TEST
        $bytes = rand();
        imagejpeg($source, "$bytes.png");

        $create = Sprite::create([
            'url_sprite' => "http://localhost:8000/$bytes.png",
        ]);

        return json_encode($create);
    }
}
