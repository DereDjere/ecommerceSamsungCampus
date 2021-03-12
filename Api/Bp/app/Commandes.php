<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commandes extends Model
{

    protected $fillable = [

        'quantite','user_id', 'design_id', 'quantite', 'prix_total', 'firstname', 'lastname', 'adress', 'city','country', 'cp', 'url_sprite'


    ];

}
