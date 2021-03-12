<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    //

    protected $fillable = [

        'code','name', 'full_name', 'iso3', 'shipping_charges'
        
    ];
}
