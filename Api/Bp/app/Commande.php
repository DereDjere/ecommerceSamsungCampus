<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'user_id','adress','city','cp','lastname','firstname','prix_total', 'email', 'quantite', 'country','ref_commande', 'status_commande'
    ];
}
