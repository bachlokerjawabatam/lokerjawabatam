<?php

/* 

province
----------------
id
name
created_at
updated_at

*/

namespace App;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    public function cities()
    {
    	return $this->hasMany('App\City');
    }

    protected $visible = ['id', 'name'];
}
