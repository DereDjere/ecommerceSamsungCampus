<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quantite extends Model
{
    protected $fillable = [
        'Stock', 'article_id'
    ];
}
