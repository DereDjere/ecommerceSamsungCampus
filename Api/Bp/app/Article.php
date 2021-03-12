<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    
    protected $fillable = [
        'genres','categorie_id', 'colors', 'titre', 'description', 'caracteristique', 'url_image_principal', 'prix', 'stock', 'compteur_visite', 'promo_id'
    ];

    
}
