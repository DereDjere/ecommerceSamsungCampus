<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cb extends Model
{
    //

    protected $fillable = [
        'numero_carte', 'users_id',
    ];

    protected $private = [
        'cvc', 'expiration_month','expiration_years','titulaire'
    ];
}
