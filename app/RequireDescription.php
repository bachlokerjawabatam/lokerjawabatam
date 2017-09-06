<?php

/* 
require_descriptions schema
---------------------
id
requirement_id fk
description
created_at
updated_at

belongsTo requirement
belongsTo post

*/


namespace App;

use Illuminate\Database\Eloquent\Model;

class RequireDescription extends Model
{
    public function requirement(){
		return $this->belongsTo('App\requirement');
	}

	public function post(){
		return $this->belongsTo('App\Post');
	}

	protected $visible = ['id', 'description'];
}
