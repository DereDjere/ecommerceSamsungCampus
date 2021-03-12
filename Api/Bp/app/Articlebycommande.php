<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articlebycommande extends Model
{
    //
    protected $fillable = [
        'id_commande', 'id_article',
    ];
}
