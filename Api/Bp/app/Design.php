<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    protected $fillable = [

        'name_design','user_artist_id', 'url', 'prix'
        
    ];

    public function artiste()
    {
        return $this->belongsTo(Artist::class, 'id');
    }
}
